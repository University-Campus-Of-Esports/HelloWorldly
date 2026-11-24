(function () {
  "use strict";
  const app = document.querySelector("#app");
  const resetButton = document.querySelector("#reset-progress");
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
  function allLessonEntries(course) { return course.chapters.flatMap(chapter => chapter.lessons); }
  function courseById(id) { return loadedCourses.find(course => course.id === id); }
  function minutesLabel(minutes) {
    if (!minutes) return "";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
  }
  function addBadges(parent, values) {
    const badges = node("div", "badges");
    values.filter(Boolean).forEach(value => badges.append(node("span", "badge", value)));
    if (badges.children.length) parent.append(badges);
  }
  function progressBar(done, total, label) {
    const percent = total ? Math.round(done / total * 100) : 0;
    const wrap = node("div");
    const bar = node("div", "progress");
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuenow", String(percent));
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", "100");
    bar.setAttribute("aria-label", label || "Course progress");
    const fill = node("span"); fill.style.width = `${percent}%`; bar.append(fill);
    wrap.append(bar, node("p", "progress-label", `${percent}% complete (${done} of ${total} lessons)`));
    return wrap;
  }

  async function initialise() {
    const indexUrl = new URL("content/courses.json", document.baseURI).href;
    const index = await Content.loadJSON(indexUrl);
    loadedCourses = await Promise.all(index.courses.map(course => Content.loadCourse(course, indexUrl)));
  }

  function courseCard(course) {
    const lessons = allLessonEntries(course);
    const card = link("", `#/course/${encodeURIComponent(course.id)}`);
    card.className = "card card-link";
    card.dataset.search = [
      course.title, course.description, course.overview,
      ...(course.categories || []), ...(course.topics || []), ...(course.tools || [])
    ].join(" ").toLocaleLowerCase("en-GB");
    card.dataset.category = (course.categories || []).join("|");
    card.dataset.topic = (course.topics || []).join("|");
    card.dataset.difficulty = course.difficulty || "";
    card.append(node("p", "eyebrow", `${lessons.length} lessons · ${minutesLabel(course.estimatedMinutes)}`));
    card.append(node("h3", "", course.title), node("p", "", course.description));
    addBadges(card, [course.difficulty, ...(course.categories || []), ...(course.topics || []).slice(0, 2), course.series && `Part ${course.series.label}`]);
    card.append(progressBar(Progress.countLessons(lessons), lessons.length));
    return card;
  }

  function renderHome() {
    const fragment = document.createDocumentFragment();
    fragment.append(
      node("h1", "", "Learn technical ideas, one step at a time."),
      node("p", "lede", "Follow structured learning paths, practise each idea and continue at your own pace.")
    );

    const last = Progress.lastVisited();
    if (last) {
      const course = courseById(last.courseId);
      const lesson = course && allLessonEntries(course).find(entry => entry.id === last.lessonId);
      if (course && lesson) {
        const continueCard = node("section", "continue-card");
        continueCard.append(node("p", "eyebrow", "Continue learning"), node("h2", "", lesson.title));
        continueCard.append(node("p", "", course.title));
        const resume = link("Resume lesson →", `#/course/${encodeURIComponent(course.id)}/lesson/${encodeURIComponent(lesson.id)}`);
        resume.className = "button inline-button"; continueCard.append(resume); fragment.append(continueCard);
      }
    }

    fragment.append(node("h2", "", "Explore courses"));
    const filters = node("form", "filters");
    filters.addEventListener("submit", event => event.preventDefault());
    const searchLabel = node("label", "", "Search");
    const search = node("input", "text-answer"); search.type = "search"; search.placeholder = "Course, topic or tool";
    searchLabel.append(search);
    function selectFilter(labelText, className, options) {
      const label = node("label", "", labelText);
      const select = node("select", className);
      select.append(new Option(`All ${labelText.toLocaleLowerCase("en-GB")}`, ""));
      options.forEach(option => select.append(new Option(option, option)));
      label.append(select); return { label, select };
    }
    const categories = [...new Set(loadedCourses.flatMap(course => course.categories || []))].sort();
    const topics = [...new Set(loadedCourses.flatMap(course => course.topics || []))].sort();
    const difficulties = [...new Set(loadedCourses.map(course => course.difficulty).filter(Boolean))];
    const category = selectFilter("Categories", "filter-select", categories);
    const topic = selectFilter("Topics", "filter-select", topics);
    const difficulty = selectFilter("Difficulties", "filter-select", difficulties);
    filters.append(searchLabel, category.label, topic.label, difficulty.label);
    const count = node("p", "filter-count");
    const cards = node("div", "cards");
    loadedCourses.filter(course => course.status === "published").forEach(course => cards.append(courseCard(course)));
    function applyFilters() {
      let visible = 0;
      Array.from(cards.children).forEach(card => {
        const matches = card.dataset.search.includes(search.value.trim().toLocaleLowerCase("en-GB"))
          && (!category.select.value || card.dataset.category.split("|").includes(category.select.value))
          && (!topic.select.value || card.dataset.topic.split("|").includes(topic.select.value))
          && (!difficulty.select.value || card.dataset.difficulty === difficulty.select.value);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      count.textContent = `${visible} course${visible === 1 ? "" : "s"} shown`;
    }
    [search, category.select, topic.select, difficulty.select].forEach(control => control.addEventListener("input", applyFilters));
    applyFilters();
    fragment.append(filters, count, cards); app.replaceChildren(fragment);
    document.title = "HelloWordly";
  }

  function renderCourse(courseId) {
    const course = courseById(courseId);
    if (!course) throw new Error("That course could not be found.");
    const lessonEntries = allLessonEntries(course);
    const fragment = document.createDocumentFragment();
    const crumbs = node("nav", "breadcrumbs"); crumbs.setAttribute("aria-label", "Breadcrumb");
    crumbs.append(link("Home", "#/"), document.createTextNode(" / Course"));
    const seriesName = course.series && course.series.id.replace(/-/g, " ");
    fragment.append(crumbs, node("p", "eyebrow", course.series ? `${seriesName} · Part ${course.series.label}` : "Course"), node("h1", "", course.title), node("p", "lede", course.description));
    addBadges(fragment, [course.difficulty, ...(course.categories || []), ...(course.topics || []), minutesLabel(course.estimatedMinutes)]);
    if (course.overview) {
      const overview = node("section", "course-overview");
      overview.append(node("h2", "", "About this course"), node("p", "", course.overview));
      if (course.prerequisites && course.prerequisites.length) overview.append(node("p", "", `Prerequisites: ${course.prerequisites.join(", ")}.`));
      if (course.tools && course.tools.length) overview.append(node("p", "", `Useful tools: ${course.tools.join(", ")}.`));
      fragment.append(overview);
    }
    fragment.append(progressBar(Progress.countLessons(lessonEntries), lessonEntries.length));
    const nextLesson = lessonEntries.find(entry => !Progress.isLessonComplete(entry.id, entry.version));
    if (nextLesson) {
      const continueLink = link("Continue next incomplete lesson →", `#/course/${encodeURIComponent(course.id)}/lesson/${encodeURIComponent(nextLesson.id)}`);
      continueLink.className = "button inline-button";
      fragment.append(continueLink);
    }
    course.chapters.forEach((chapter, chapterIndex) => {
      const section = node("section", "chapter");
      const done = Progress.countLessons(chapter.lessons);
      section.append(node("p", "eyebrow", `Chapter ${chapterIndex + 1} · ${done}/${chapter.lessons.length} complete`), node("h2", "", chapter.title), node("p", "", chapter.description));
      const list = node("ol", "lesson-list");
      chapter.lessons.forEach(lesson => {
        const row = node("li");
        const details = node("span", "lesson-details");
        details.append(link(lesson.title, `#/course/${encodeURIComponent(course.id)}/lesson/${encodeURIComponent(lesson.id)}`));
        if (lesson.estimatedMinutes) details.append(node("small", "", minutesLabel(lesson.estimatedMinutes)));
        row.append(details);
        if (Progress.isLessonComplete(lesson.id, lesson.version)) row.append(node("span", "complete-mark", "Complete"));
        list.append(row);
      });
      section.append(list); fragment.append(section);
    });
    if (course.furtherStudy && course.furtherStudy.length) {
      const further = node("section", "further-study");
      further.append(node("h2", "", "Further study"), node("p", "", "Use these external resources to practise or explore beyond this course."));
      const list = node("ul");
      course.furtherStudy.forEach(resource => {
        const item = node("li"); const anchor = link(resource.title, resource.url);
        anchor.target = "_blank"; anchor.rel = "noopener noreferrer";
        item.append(anchor);
        if (resource.description) item.append(document.createTextNode(` — ${resource.description}`));
        list.append(item);
      });
      further.append(list); fragment.append(further);
    }
    const actions = node("div", "actions");
    const reset = node("button", "button button-secondary", "Reset this course");
    reset.type = "button";
    reset.addEventListener("click", () => {
      if (window.confirm(`Reset progress for ${course.title}?`)) { Progress.resetCourse(lessonEntries.map(item => item.id)); renderCourse(course.id); }
    });
    actions.append(reset); fragment.append(actions);
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
    Progress.visit(course.id, lesson.id);
    const allLessons = course.chapters.flatMap(chapter => chapter.lessons.map(entry => ({ chapter, entry })));
    const position = allLessons.findIndex(item => item.entry.id === lessonId);
    const fragment = document.createDocumentFragment();
    const crumbs = node("nav", "breadcrumbs"); crumbs.setAttribute("aria-label", "Breadcrumb");
    crumbs.append(link("Home", "#/"), document.createTextNode(" / "), link(course.title, `#/course/${encodeURIComponent(course.id)}`), document.createTextNode(` / ${targetChapter.title}`));
    const status = node("p", "complete-mark", Progress.isLessonComplete(lesson.id, targetEntry.version) ? "Lesson complete" : "Complete every activity to finish this lesson.");
    status.id = "lesson-status"; status.setAttribute("aria-live", "polite");
    fragment.append(crumbs, node("p", "eyebrow", `Lesson ${position + 1} of ${allLessons.length} · ${minutesLabel(targetEntry.estimatedMinutes)}`), node("h1", "", lesson.title), node("p", "lede", lesson.introduction));
    const outcomeTitle = node("h2", "", "Learning outcomes");
    const outcomes = node("ul", "outcomes"); lesson.learningOutcomes.forEach(outcome => outcomes.append(node("li", "", outcome)));
    const content = node("article", "lesson-content"); content.innerHTML = Content.renderMarkdown(lesson.markdown);
    const activityTitle = node("h2", "", "Activities");
    const activityArea = node("div"); lesson.activities.forEach(activity => activityArea.append(Activities.render(activity, lesson.id, targetEntry.version)));
    function updateCompletion() {
      if (lesson.activities.every(activity => Progress.isActivityComplete(activity.id, targetEntry.version))) {
        Progress.completeLesson(lesson.id, targetEntry.version); status.textContent = "Lesson complete";
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
