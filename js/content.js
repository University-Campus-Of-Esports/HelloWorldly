(function () {
  "use strict";

  const cache = new Map();

  function resolve(path, base) {
    return new URL(path, base || document.baseURI).href;
  }

  async function loadJSON(path, base) {
    const url = resolve(path, base);
    if (cache.has(url)) return cache.get(url);
    const request = fetch(url).then(async response => {
      if (!response.ok) throw new Error(`Could not load ${path} (${response.status}).`);
      try { return await response.json(); }
      catch (_) { throw new Error(`The JSON in ${path} is not valid.`); }
    });
    cache.set(url, request);
    return request;
  }

  async function loadText(path, base) {
    const url = resolve(path, base);
    if (cache.has(url)) return cache.get(url);
    const request = fetch(url).then(response => {
      if (!response.ok) throw new Error(`Could not load ${path} (${response.status}).`);
      return response.text();
    });
    cache.set(url, request);
    return request;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function inline(text) {
    let safe = escapeHTML(text);
    safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>");
    safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    safe = safe.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
    return safe;
  }

  // A deliberately small renderer: raw HTML is escaped before supported Markdown is added.
  function renderMarkdown(markdown) {
    const lines = String(markdown).replace(/\r/g, "").split("\n");
    const output = [];
    let paragraph = [];
    let list = null;
    let code = null;

    function flushParagraph() {
      if (paragraph.length) output.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
    function flushList() {
      if (list) output.push(`<${list.type}>${list.items.map(item => `<li>${inline(item)}</li>`).join("")}</${list.type}>`);
      list = null;
    }

    lines.forEach(line => {
      if (code !== null) {
        if (/^```/.test(line)) {
          output.push(`<pre><code>${escapeHTML(code.join("\n"))}</code></pre>`);
          code = null;
        } else code.push(line);
        return;
      }
      if (/^```/.test(line)) { flushParagraph(); flushList(); code = []; return; }
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      const bullet = line.match(/^[-*]\s+(.+)$/);
      const numbered = line.match(/^\d+\.\s+(.+)$/);
      const quote = line.match(/^>\s?(.*)$/);
      if (heading) { flushParagraph(); flushList(); const level = heading[1].length; output.push(`<h${level}>${inline(heading[2])}</h${level}>`); }
      else if (bullet || numbered) {
        flushParagraph();
        const type = bullet ? "ul" : "ol";
        if (list && list.type !== type) flushList();
        if (!list) list = { type, items: [] };
        list.items.push((bullet || numbered)[1]);
      } else if (quote) { flushParagraph(); flushList(); output.push(`<blockquote>${inline(quote[1])}</blockquote>`); }
      else if (!line.trim()) { flushParagraph(); flushList(); }
      else { if (list) flushList(); paragraph.push(line.trim()); }
    });
    flushParagraph(); flushList();
    if (code !== null) output.push(`<pre><code>${escapeHTML(code.join("\n"))}</code></pre>`);
    return output.join("\n");
  }

  async function loadCourse(courseEntry) {
    const manifestUrl = resolve(courseEntry.manifest);
    const course = await loadJSON(manifestUrl);
    const chapters = await Promise.all(course.chapters.map(async chapterEntry => {
      const chapterUrl = resolve(chapterEntry.manifest, manifestUrl);
      const chapter = await loadJSON(chapterUrl);
      return { ...chapter, manifestUrl: chapterUrl };
    }));
    return { ...course, manifestUrl, chapters };
  }

  async function loadLesson(chapter, lessonEntry) {
    const lessonUrl = resolve(lessonEntry.file, chapter.manifestUrl);
    const lesson = await loadJSON(lessonUrl);
    const markdown = await loadText(lesson.content, lessonUrl);
    return { ...lesson, markdown, lessonUrl };
  }

  window.Content = { loadJSON, loadCourse, loadLesson, renderMarkdown, escapeHTML };
}());
