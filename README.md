# HelloWordly

Short, interactive lessons for learning technical subjects one step at a time.

[![Deploy to GitHub Pages](https://github.com/University-Campus-Of-Esports/HelloWorldly/actions/workflows/deploy.yml/badge.svg)](https://github.com/University-Campus-Of-Esports/HelloWorldly/actions/workflows/deploy.yml)

[View the live site](https://university-campus-of-esports.github.io/HelloWorldly/) · [Create course content](CONTENT_GUIDE.md) · [Report an issue](https://github.com/University-Campus-Of-Esports/HelloWorldly/issues)

HelloWordly is a mobile-first learning app built for concise explanations and hands-on activities. It includes structured **Programming Foundations I–III**, **AI Fundamentals**, **Unity C# Essentials** and **Unreal C++ Essentials** courses.

The app runs entirely in the browser. There are no accounts, runtime dependencies, external APIs, or build tools, and learning progress stays on the user's device.

## What you can do

- Work through Markdown-based lessons organised into courses and chapters.
- Practise with multiple-choice, true-or-false, fill-in-the-blank, and ordering activities.
- Get immediate feedback, retry activities, and track lesson and course completion.
- Resume where you left off with progress saved in browser storage.
- Search and filter courses by category, topic and difficulty.
- See course prerequisites, tools, time estimates and curated further-study links.
- Follow numbered learning pathways from beginner through advanced material.
- Navigate by keyboard and use visible focus states and semantic controls.
- Share or refresh lesson URLs without losing your place.

## Run locally

Because lesson content is loaded with `fetch`, serve the repository through a local web server instead of opening `index.html` directly.

```bash
git clone https://github.com/University-Campus-Of-Esports/HelloWorldly.git
cd HelloWorldly
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). Depending on your Python installation, the command may be `python3 -m http.server 8000` or `py -m http.server 8000`.

## Create or edit a course

Application code and learning content are kept separate. Course metadata and activities use JSON, while lesson explanations use Markdown.

```text
content/
├── courses.json
└── ai-fundamentals/
    ├── course.json
    └── 01-what-is-ai/
        ├── chapter.json
        ├── lesson-1-1.json
        └── lesson-1-1.md
```

To add content:

1. Add a lesson's JSON metadata and Markdown content to a chapter directory.
2. Register the lesson in the chapter's `chapter.json` manifest.
3. Register new chapters in `course.json` and new courses in `content/courses.json`.
4. Run `node scripts/validate-content.js` before publishing.

See the [content authoring guide](CONTENT_GUIDE.md) for schemas and examples. The [content prompt](CONTENT_PROMPT.md) is also available as a reusable brief for generating a complete chapter with an AI assistant.

## Project structure

```text
├── .github/workflows/   # GitHub Pages deployment
├── content/             # Course, chapter, and lesson content
├── js/                  # Navigation, activities, content, and progress logic
├── scripts/             # Content validation
├── index.html           # Application shell
└── style.css            # Responsive interface and theme
```

HelloWordly uses HTML, CSS, and vanilla JavaScript. Its deliberately limited Markdown renderer escapes raw HTML and supports headings, paragraphs, emphasis, lists, blockquotes, fenced code blocks, and HTTP(S) links.

## Deploy

The included GitHub Actions workflow deploys the static site to GitHub Pages whenever a change reaches `main`.

For a fork or new repository:

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Push to `main` or manually run the **Deploy HelloWordly to GitHub Pages** workflow.

Relative URLs are resolved from `document.baseURI`, so the app works as either an account site or a project site hosted below a repository path.

## Contributing

Contributions are welcome. Before opening a pull request, please:

- Keep the app dependency-free unless a change clearly justifies otherwise.
- Follow the existing content manifests and naming conventions.
- Test navigation, activities, progress persistence, and keyboard interaction locally.
- Keep lessons concise, approachable, and suitable for their stated audience.

If you are proposing a substantial feature or content change, open an issue first so the approach can be discussed.

## Current limitations

- Progress is specific to one browser and device and is removed when site storage is cleared.
- Activities use fixed answers; the app does not execute code or use AI-based assessment.
- There is currently no account synchronisation or offline mode.
