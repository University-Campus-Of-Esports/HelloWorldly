(function () {
  "use strict";
  const KEY = "hellowordly-progress-v1";

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      if (!value || typeof value !== "object") return { activities: {}, lessons: {} };
      return {
        activities: value.activities && typeof value.activities === "object" ? value.activities : {},
        lessons: value.lessons && typeof value.lessons === "object" ? value.lessons : {}
      };
    } catch (_) { return { activities: {}, lessons: {} }; }
  }

  function write(value) {
    try { localStorage.setItem(KEY, JSON.stringify(value)); }
    catch (_) { /* The lesson remains usable when storage is unavailable. */ }
  }

  function completeActivity(activityId) {
    const value = read();
    value.activities[activityId] = true;
    write(value);
  }

  function completeLesson(lessonId) {
    const value = read();
    value.lessons[lessonId] = true;
    write(value);
  }

  function isActivityComplete(id) { return Boolean(read().activities[id]); }
  function isLessonComplete(id) { return Boolean(read().lessons[id]); }
  function countLessons(ids) { const value = read(); return ids.filter(id => value.lessons[id]).length; }
  function reset() { try { localStorage.removeItem(KEY); } catch (_) {} }

  window.Progress = { completeActivity, completeLesson, isActivityComplete, isLessonComplete, countLessons, reset };
}());
