"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const contentRoot = path.join(root, "content");
const errors = [];
const ids = new Map();
const activityTypes = new Set(["multiple-choice", "true-false", "fill-blank", "ordering"]);
const difficulties = new Set(["beginner", "intermediate", "advanced"]);
const statuses = new Set(["draft", "published", "coming-soon", "archived"]);
let lessonCount = 0;

function fail(file, message) {
  errors.push(`${path.relative(root, file)}: ${message}`);
}

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { fail(file, `invalid JSON (${error.message})`); return null; }
}

function requiredString(value, file, name) {
  if (typeof value !== "string" || !value.trim()) fail(file, `${name} must be a non-empty string`);
}

function stringArray(value, file, name, requireValues) {
  if (!Array.isArray(value) || (requireValues && !value.length)) {
    fail(file, `${name} must be ${requireValues ? "a non-empty" : "an"} array`);
    return;
  }
  if (value.some(item => typeof item !== "string" || !item.trim())) fail(file, `${name} must contain only non-empty strings`);
  if (new Set(value).size !== value.length) fail(file, `${name} must not contain duplicates`);
}

function uniqueId(id, file, kind) {
  requiredString(id, file, `${kind} id`);
  if (!id) return;
  if (ids.has(id)) fail(file, `duplicate ${kind} id "${id}" (first used in ${path.relative(root, ids.get(id))})`);
  else ids.set(id, file);
}

function resolveFile(baseFile, relative, label) {
  requiredString(relative, baseFile, label);
  if (!relative) return null;
  if (path.isAbsolute(relative) || relative.includes("\\")) {
    fail(baseFile, `${label} must be a forward-slash relative path`);
    return null;
  }
  const target = path.resolve(path.dirname(baseFile), relative);
  if (!target.startsWith(contentRoot + path.sep)) {
    fail(baseFile, `${label} resolves outside content/`);
    return null;
  }
  if (!fs.existsSync(target)) { fail(baseFile, `missing ${label}: ${relative}`); return null; }
  return target;
}

function validateActivity(activity, lessonFile) {
  uniqueId(activity.id, lessonFile, "activity");
  requiredString(activity.question, lessonFile, `activity ${activity.id} question`);
  requiredString(activity.explanation, lessonFile, `activity ${activity.id} explanation`);
  if (!activityTypes.has(activity.type)) fail(lessonFile, `activity ${activity.id} has unsupported type "${activity.type}"`);
  if (activity.type === "multiple-choice") {
    if (!Array.isArray(activity.options) || activity.options.length < 2) fail(lessonFile, `activity ${activity.id} needs at least two options`);
    if (!Number.isInteger(activity.correctIndex) || !activity.options || activity.correctIndex < 0 || activity.correctIndex >= activity.options.length) fail(lessonFile, `activity ${activity.id} has an invalid correctIndex`);
  } else if (activity.type === "true-false" && typeof activity.correct !== "boolean") {
    fail(lessonFile, `activity ${activity.id} correct must be a Boolean`);
  } else if (activity.type === "fill-blank" && (!Array.isArray(activity.acceptedAnswers) || !activity.acceptedAnswers.length)) {
    fail(lessonFile, `activity ${activity.id} needs acceptedAnswers`);
  } else if (activity.type === "ordering") {
    const itemIds = Array.isArray(activity.items) ? activity.items.map(item => item.id) : [];
    if (itemIds.length < 2 || new Set(itemIds).size !== itemIds.length) fail(lessonFile, `activity ${activity.id} needs unique ordering items`);
    if (!Array.isArray(activity.correctOrder) || activity.correctOrder.length !== itemIds.length || activity.correctOrder.some(id => !itemIds.includes(id))) fail(lessonFile, `activity ${activity.id} correctOrder must contain every item exactly once`);
    if (itemIds.every((id, index) => id === activity.correctOrder[index])) fail(lessonFile, `activity ${activity.id} starts in the correct order`);
  }
}

function validateLesson(entry, chapterFile) {
  lessonCount += 1;
  if (!Number.isInteger(entry.version) || entry.version < 1) fail(chapterFile, `lesson ${entry.id} needs a positive integer version`);
  if (!Number.isInteger(entry.estimatedMinutes) || entry.estimatedMinutes < 1) fail(chapterFile, `lesson ${entry.id} needs estimatedMinutes`);
  const lessonFile = resolveFile(chapterFile, entry.file, `lesson ${entry.id} file`);
  if (!lessonFile) return;
  const lesson = readJSON(lessonFile);
  if (!lesson) return;
  if (lesson.id !== entry.id) fail(lessonFile, `lesson id does not match chapter entry "${entry.id}"`);
  uniqueId(lesson.id, lessonFile, "lesson");
  requiredString(lesson.title, lessonFile, "lesson title");
  requiredString(lesson.introduction, lessonFile, "lesson introduction");
  if (!Array.isArray(lesson.learningOutcomes) || !lesson.learningOutcomes.length) fail(lessonFile, "lesson needs learningOutcomes");
  if (!Array.isArray(lesson.activities) || lesson.activities.length < 2) fail(lessonFile, "lesson needs at least two activities");
  else lesson.activities.forEach(activity => validateActivity(activity, lessonFile));
  resolveFile(lessonFile, lesson.content, "Markdown content");
}

function validateChapter(entry, courseFile) {
  const chapterFile = resolveFile(courseFile, entry.manifest, `chapter ${entry.id} manifest`);
  if (!chapterFile) return 0;
  const chapter = readJSON(chapterFile);
  if (!chapter) return 0;
  if (chapter.id !== entry.id) fail(chapterFile, `chapter id does not match course entry "${entry.id}"`);
  uniqueId(chapter.id, chapterFile, "chapter");
  requiredString(chapter.title, chapterFile, "chapter title");
  requiredString(chapter.description, chapterFile, "chapter description");
  if (!Array.isArray(chapter.lessons) || !chapter.lessons.length) fail(chapterFile, "chapter needs lessons");
  else chapter.lessons.forEach(lesson => validateLesson(lesson, chapterFile));
  return Array.isArray(chapter.lessons) ? chapter.lessons.length : 0;
}

function validateCourse(entry, indexFile) {
  const courseFile = resolveFile(indexFile, entry.manifest, `course ${entry.id} manifest`);
  if (!courseFile) return;
  const course = readJSON(courseFile);
  if (!course) return;
  if (course.id !== entry.id) fail(courseFile, `course id does not match index entry "${entry.id}"`);
  uniqueId(course.id, courseFile, "course");
  ["title", "description", "overview"].forEach(field => requiredString(course[field], courseFile, `course ${field}`));
  stringArray(course.categories, courseFile, "categories", true);
  stringArray(course.topics, courseFile, "topics", true);
  [...(course.categories || []), ...(course.topics || [])].forEach(value => {
    if (value !== value.toLocaleLowerCase("en-GB")) fail(courseFile, `category/topic "${value}" must be lowercase`);
  });
  if (!difficulties.has(course.difficulty)) fail(courseFile, `invalid difficulty "${course.difficulty}"`);
  if (!statuses.has(course.status)) fail(courseFile, `invalid status "${course.status}"`);
  if (!Number.isInteger(course.estimatedMinutes) || course.estimatedMinutes < 1) fail(courseFile, "course needs estimatedMinutes");
  if (!course.series || typeof course.series.id !== "string" || !Number.isInteger(course.series.part) || course.series.part < 1 || typeof course.series.label !== "string") fail(courseFile, "course needs a valid series object");
  stringArray(course.prerequisites, courseFile, "prerequisites", false);
  stringArray(course.tools, courseFile, "tools", false);
  if (!Array.isArray(course.furtherStudy) || course.furtherStudy.length < 2) fail(courseFile, "furtherStudy must contain at least two resources");
  else course.furtherStudy.forEach((resource, index) => {
    requiredString(resource.title, courseFile, `furtherStudy[${index}] title`);
    requiredString(resource.description, courseFile, `furtherStudy[${index}] description`);
    try {
      const url = new URL(resource.url);
      if (url.protocol !== "https:") throw new Error("not HTTPS");
    } catch (_) { fail(courseFile, `furtherStudy[${index}] must use a valid HTTPS URL`); }
  });
  if (!Array.isArray(course.chapters) || !course.chapters.length) fail(courseFile, "course needs chapters");
  else {
    const courseLessonCount = course.chapters.reduce((total, chapter) => total + validateChapter(chapter, courseFile), 0);
    if (course.status === "published" && courseLessonCount < 10) fail(courseFile, "a published full course must contain at least ten lessons");
  }
}

const indexFile = path.join(contentRoot, "courses.json");
const index = readJSON(indexFile);
if (index && Array.isArray(index.courses)) index.courses.forEach(course => validateCourse(course, indexFile));
else fail(indexFile, "courses must be an array");

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):\n`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const courseCount = index.courses.length;
  console.log(`Content validation passed: ${courseCount} courses and ${lessonCount} lessons.`);
}
