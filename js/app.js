(function () {
  "use strict";
  const app = document.querySelector("#app");
  const resetButton = document.querySelector("#reset-progress");
  let courses = [];
  let loadedCourses = [];
  let renderNumber = 0;

  function node(tag, className, text) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  }
  function link(text, href) { const result = node("a", "", text); result.href = href; return result; }
  function showStatus(text, error) { app.replaceChildren(node("p", error ? "error" : "status", text)); }
  function progressBar(done, total) {
    const percent = total ? Math.round(done / total * 100) : 0;
    const wrap = node("div");
    const bar = node("div", "progress"); bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-valuenow", String(percent)); bar.setAttribute("aria-valuemin", "0"); bar.setAttribute("aria-valuemax", "100"); bar.setAttribute("aria-label", "Course progress");
    const fill = node("span"); fill.style.width = `${percent}%`; bar.append(fill);
    wrap.append(bar, node("p", "progress-label", `${percent}% complete (${done} of ${total} lessons)`));
    return wrap;
  }
  function allLessonEntries(course) { return course.chapters.flatMap(chapter => chapter.lessons); }
  function courseById(id) { return loadedCourses.find(course => course.id === id); }

  async function initialise() {
    const indexUrl = new URL("content/courses.json", document.baseURI).href;
    const index = await Content.loadJSON(indexUrl);
    courses = index.courses;
    loadedCourses = await Promise.all(courses.map(course => Content.loadCourse(course, indexUrl)));
  }

  function renderHome() {
    const fragment = document.createDocumentFragment();
    const heading = node("h1", "", "Learn technical ideas, one step at a time.");
    const intro = node("p", "lede", "HelloWordly offers short explanations and interactive exercises, with no account required.");
    const title = node("h2", "", "Available courses");
    const cards = node("div", "cards");
    loadedCourses.forEach(course => {
      const lessonIds = allLessonEntries(course).map(lesson => lesson.id);
      const card = link("", `#/course/${encodeURIComponent(course.id)}`); card.className = "card card-link";
      card.append(node("p", "eyebrow", `${lessonIds.length} lessons`), node("h3", "", course.title), node("p", "", course.description), progressBar(Progress.countLessons(lessonIds), lessonIds.length));
      cards.append(card);
    });
    fragment.append(heading, intro, title, cards); app.replaceChildren(fragment);
    document.title = "HelloWordly";
  }

  function renderCourse(courseId) {
    const course = courseById(courseId);
    if (!course) throw new Error("That course could not be found.");
    const lessonEntries = allLessonEntries(course);
    const fragment = document.createDocumentFragment();
    const crumbs = node("nav", "breadcrumbs"); crumbs.setAttribute("aria-label", "Breadcrumb"); crumbs.append(link("Home", "#/"), document.createTextNode(" / Course"));
    fragment.append(crumbs, node("p", "eyebrow", "Course"), node("h1", "", course.title), node("p", "lede", course.description), progressBar(Progress.countLessons(lessonEntries.map(item => item.id)), lessonEntries.length));
    course.chapters.forEach((chapter, chapterIndex) => {
      const section = node("section", "chapter");
      section.append(node("p", "eyebrow", `Chapter ${chapterIndex + 1}`), node("h2", "", chapter.title), node("p", "", chapter.description));
      const list = node("ol", "lesson-list");
      chapter.lessons.forEach(lesson => {
        const row = node("li");
        row.append(link(lesson.title, `#/course/${encodeURIComponent(course.id)}/lesson/${encodeURIComponent(lesson.id)}`));
        if (Progress.isLessonComplete(lesson.id)) row.append(node("span", "complete-mark", "Complete"));
        list.append(row);
      });
      section.append(list); fragment.append(section);
    });
    app.replaceChildren(fragment); document.title = `${course.title} — HelloWordly`;
  }

  async function renderLesson(courseId, lessonId, currentRender) {
    const course = courseById(courseId);
    if (!course) throw new Error("That course could not be found.");
    let targetChapter; let targetEntry;
    course.chapters.some(chapter => {
      const found = chapter.lessons.find(lesson => lesson.id === lessonId);
      if (found) { targetChapter = chapter; targetEntry = found; return true; }
      return false;
    });
    if (!targetEntry) throw new Error("That lesson could not be found.");
    const lesson = await Content.loadLesson(targetChapter, targetEntry);
    if (currentRender !== renderNumber) return;
    const allLessons = course.chapters.flatMap(chapter => chapter.lessons.map(entry => ({ chapter, entry })));
    const position = allLessons.findIndex(item => item.entry.id === lessonId);
    const fragment = document.createDocumentFragment();
    const crumbs = node("nav", "breadcrumbs"); crumbs.setAttribute("aria-label", "Breadcrumb");
    crumbs.append(link("Home", "#/"), document.createTextNode(" / "), link(course.title, `#/course/${encodeURIComponent(course.id)}`), document.createTextNode(` / ${targetChapter.title}`));
    const status = node("p", "complete-mark", Progress.isLessonComplete(lesson.id) ? "Lesson complete" : "Complete every activity to finish this lesson."); status.id = "lesson-status"; status.setAttribute("aria-live", "polite");
    fragment.append(crumbs, node("p", "eyebrow", "Lesson"), node("h1", "", lesson.title), node("p", "lede", lesson.introduction));
    const outcomeTitle = node("h2", "", "Learning outcomes");
    const outcomes = node("ul", "outcomes"); lesson.learningOutcomes.forEach(outcome => outcomes.append(node("li", "", outcome)));
    const content = node("article", "lesson-content"); content.innerHTML = Content.renderMarkdown(lesson.markdown);
    const activityTitle = node("h2", "", "Activities");
    const activityArea = node("div"); lesson.activities.forEach(activity => activityArea.append(Activities.render(activity)));
    function updateCompletion() {
      if (lesson.activities.every(activity => Progress.isActivityComplete(activity.id))) {
        Progress.completeLesson(lesson.id); status.textContent = "Lesson complete";
      }
    }
    activityArea.addEventListener("activitycomplete", updateCompletion); updateCompletion();
    const nav = node("nav", "lesson-nav"); nav.setAttribute("aria-label", "Lesson navigation");
    if (position > 0) nav.append(link(`← ${allLessons[position - 1].entry.title}`, `#/course/${encodeURIComponent(course.id)}/lesson/${encodeURIComponent(allLessons[position - 1].entry.id)}`)); else nav.append(node("span"));
    if (position < allLessons.length - 1) nav.append(link(`${allLessons[position + 1].entry.title} →`, `#/course/${encodeURIComponent(course.id)}/lesson/${encodeURIComponent(allLessons[position + 1].entry.id)}`));
    else nav.append(link("Back to course →", `#/course/${encodeURIComponent(course.id)}`));
    fragment.append(outcomeTitle, outcomes, content, activityTitle, activityArea, status, nav);
    app.replaceChildren(fragment); document.title = `${lesson.title} — HelloWordly`;
  }

  async function route() {
    const currentRender = ++renderNumber;
    showStatus("Loading…");
    try {
      if (!loadedCourses.length) await initialise();
      if (currentRender !== renderNumber) return;
      const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
      if (!parts.length) renderHome();
      else if (parts[0] === "course" && parts.length === 2) renderCourse(parts[1]);
      else if (parts[0] === "course" && parts[2] === "lesson" && parts.length === 4) await renderLesson(parts[1], parts[3], currentRender);
      else throw new Error("This page does not exist.");
      app.focus({ preventScroll: true }); window.scrollTo(0, 0);
    } catch (error) { if (currentRender === renderNumber) showStatus(error.message || "Something went wrong while loading the content.", true); }
  }

  resetButton.addEventListener("click", () => {
    if (window.confirm("Reset all completed lessons and activities on this device?")) { Progress.reset(); route(); }
  });
  window.addEventListener("hashchange", route);
  route();
}());
