# HelloWordly

HelloWordly is a minimal, mobile-first learning application for short technical lessons and interactive exercises. It is a static site inspired by the simplicity of SoloLearn, with content kept separate from application code.

The included **AI Fundamentals** course provides eight beginner lessons across four chapters. No account, backend or build step is required; progress stays in the browser's `localStorage`.

## Features

- Course, chapter and lesson navigation using refresh-safe URL hashes.
- Markdown explanations and JSON metadata loaded from content manifests.
- Multiple-choice, true-or-false, fill-in-the-blank and ordering activities.
- Immediate feedback, retry support and lesson/course completion indicators.
- Persistent progress with a confirmed reset option.
- Responsive dark theme, semantic controls, keyboard operation and visible focus.
- Safe, deliberately limited Markdown rendering that escapes raw HTML.
- Friendly errors when content cannot be loaded.

## Technology

HTML5, CSS3, vanilla JavaScript, Markdown and JSON. There are no runtime dependencies, package manager, framework, compiler, external API or database.

## Deploy to GitHub Pages

1. Put these files in a GitHub repository whose default deployment branch is `main`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. This is the one-time repository setting.
3. Push to `main`, or run **Deploy HelloWordly to GitHub Pages** manually from the Actions tab.
4. Read the deployment job's `github-pages` environment URL after it succeeds.

The workflow in `.github/workflows/deploy.yml` uses GitHub's official Pages actions and uploads the repository directly. All application URLs are resolved relative to `document.baseURI`, so both account sites and project sites under a repository subdirectory are supported.

## Author content

Read [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the schemas and concise examples. In summary:

1. Add a lesson JSON file and its Markdown file to a chapter directory.
2. Register the lesson in that directory's `chapter.json`.
3. To add a chapter, register its `chapter.json` in the course manifest.
4. To add a course, register its course manifest in `content/courses.json`.

Use [CONTENT_PROMPT.md](CONTENT_PROMPT.md) as a reusable prompt for a chatbot or coding agent to create a complete chapter without changing application source files.

## Known limitations

- Progress is device- and browser-specific and is lost when site storage is cleared.
- Markdown intentionally supports only headings, paragraphs, emphasis, lists, blockquotes, fenced code and HTTP(S) links.
- Activities assess fixed answers only; the application does not run code or use AI assessment.
- Content is fetched by the browser, so it is intended to be read from GitHub Pages rather than directly from a local file URL.
- There is no account, synchronisation, search or offline mode.
