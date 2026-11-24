(function () {
  "use strict";
  const KEY = "hellowordly-progress-v2";

  function empty() { return { activities: {}, lessons: {}, lastVisited: null }; }

  function read() {
    try {
      let value = JSON.parse(localStorage.getItem(KEY));
      if (!value || typeof value !== "object") {
        const legacy = JSON.parse(localStorage.getItem("hellowordly-progress-v1"));
        if (!legacy || typeof legacy !== "object") return empty();
        value = empty();
        Object.keys(legacy.lessons || {}).forEach(id => { value.lessons[id] = { version: 1, completedAt: 0 }; });
        write(value);
      }
      return {
        activities: value.activities && typeof value.activities === "object" ? value.activities : {},
        lessons: value.lessons && typeof value.lessons === "object" ? value.lessons : {},
        lastVisited: value.lastVisited && typeof value.lastVisited === "object" ? value.lastVisited : null
      };
    } catch (_) { return empty(); }
  }

  function write(value) {
    try { localStorage.setItem(KEY, JSON.stringify(value)); }
    catch (_) { /* The lesson remains usable when storage is unavailable. */ }
  }

  function completeActivity(activityId, lessonId, version) {
    const value = read();
    value.activities[activityId] = { lessonId, version: Number(version) || 1, completedAt: Date.now() };
    write(value);
  }

  function completeLesson(lessonId, version) {
    const value = read();
    value.lessons[lessonId] = { version: Number(version) || 1, completedAt: Date.now() };
    write(value);
  }

  function isActivityComplete(id, version) {
    const completion = read().activities[id];
    return Boolean(completion && completion.version === (Number(version) || 1));
  }
  function isLessonComplete(id, version) {
    const completion = read().lessons[id];
    return Boolean(completion && completion.version === (Number(version) || 1));
  }
  function countLessons(entries) { return entries.filter(entry => isLessonComplete(entry.id, entry.version)).length; }

  function visit(courseId, lessonId) {
    const value = read();
    value.lastVisited = { courseId, lessonId, visitedAt: Date.now() };
    write(value);
  }
  function lastVisited() { return read().lastVisited; }

  function resetCourse(lessonIds) {
    const value = read();
    lessonIds.forEach(id => { delete value.lessons[id]; });
    Object.keys(value.activities).forEach(id => {
      const lessonId = value.activities[id] && value.activities[id].lessonId;
      if (!lessonId || lessonIds.includes(lessonId)) delete value.activities[id];
    });
    if (value.lastVisited && lessonIds.includes(value.lastVisited.lessonId)) value.lastVisited = null;
    write(value);
  }

  function reset() {
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem("hellowordly-progress-v1");
    } catch (_) {}
  }

  window.Progress = {
    completeActivity, completeLesson, isActivityComplete, isLessonComplete,
    countLessons, visit, lastVisited, resetCourse, reset
  };
}());
