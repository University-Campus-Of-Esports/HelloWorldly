# HelloWordly Content Guide

HelloWordly content is a hierarchy of **course → chapter → lesson → activity**. Application source never needs editing for new content. Use unique, lowercase IDs containing letters, numbers and hyphens; IDs are also progress keys and must never be reused.

All paths are relative to the JSON file that contains them. Use forward slashes and never begin a content path with `/`.

## File structure

```text
content/
├── courses.json
└── course-id/
    ├── course.json
    └── 01-chapter-name/
        ├── chapter.json
        ├── lesson-1.json
        └── lesson-1.md
```

## Manifests

`content/courses.json` registers course manifests:

```json
{
  "schemaVersion": 1,
  "courses": [
    { "id": "web-basics", "manifest": "web-basics/course.json" }
  ]
}
```

A course manifest supplies display information and ordered chapter manifests:

```json
{
  "id": "web-basics",
  "title": "Web Basics",
  "description": "Learn how simple web pages work.",
  "overview": "A fuller description of the course scope, audience and destination.",
  "categories": ["technology"],
  "topics": ["web", "html"],
  "difficulty": "beginner",
  "series": { "id": "web-development", "part": 1, "label": "I" },
  "estimatedMinutes": 90,
  "prerequisites": [],
  "tools": ["web browser", "text editor"],
  "status": "published",
  "furtherStudy": [
    {
      "title": "MDN Learn Web Development",
      "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development",
      "description": "Tutorials and reference material for continued study."
    }
  ],
  "chapters": [
    { "id": "html", "manifest": "01-html/chapter.json" }
  ]
}
```

A chapter manifest supplies display information and ordered lesson files:

```json
{
  "id": "html",
  "title": "HTML",
  "description": "Structure content with HTML.",
  "lessons": [
    { "id": "html-elements", "title": "HTML Elements", "file": "lesson-1.json", "version": 1, "estimatedMinutes": 10 }
  ]
}
```

The `id` in every manifest entry must match the `id` inside the referenced file. Increment a lesson's positive integer `version` whenever its activities or completion requirements change. This prevents an older completion record from incorrectly completing revised material.

Use controlled lowercase values for `categories` and `topics`. `difficulty` must be `beginner`, `intermediate` or `advanced`; `status` must be `draft`, `published`, `coming-soon` or `archived`. Use categories for broad areas such as `technology` or `games`, topics for subjects such as `programming` or `unity`, and the difficulty field rather than a difficulty tag. Further-study links must use HTTPS and should favour authoritative, stable sources.

A `published` full course must contain at least ten lessons and two further-study resources. Use `draft` while developing a smaller curriculum and publish only after its outcomes cover the stated course scope.

## Lesson schema

Each lesson JSON file uses this shape:

```json
{
  "id": "html-elements",
  "title": "HTML Elements",
  "introduction": "A one-sentence introduction.",
  "content": "lesson-1.md",
  "learningOutcomes": ["Describe an HTML element."],
  "activities": []
}
```

`content` points to the lesson Markdown in the same directory. Supply at least one learning outcome and two or three activities. A lesson completes only when every activity is correct.

Every published lesson activity also contributes to that course's daily-practice pool. The application deterministically selects and shuffles six activities using the course ID and learner's local date. Activity IDs must therefore remain globally unique, and questions should make sense when shown without the surrounding lesson page; the practice view displays the source lesson title for context.

## Markdown

Supported syntax is intentionally small:

````markdown
## A heading

Use **strong emphasis**, *emphasis* and `inline code`.

- A list item
- Another item

> A short note.

```text
code or pseudocode
```
````

HTTP and HTTPS links use `[label](https://example.com)`. Raw HTML, tables, images and nested lists are not supported. Explain one idea at a time, use UK English where appropriate, and put assessed facts in the lesson before asking about them.

## Activity schemas

Every activity requires a globally unique `id`, a supported `type`, a clear `question` and an `explanation` shown after a correct answer.

### Multiple choice

```json
{
  "id": "html-elements-a1",
  "type": "multiple-choice",
  "question": "Which tag creates a paragraph?",
  "options": ["<p>", "<img>", "<title>"],
  "correctIndex": 0,
  "explanation": "The p element represents a paragraph."
}
```

`correctIndex` is zero-based and must identify an existing option. Use one unambiguously best answer.

### True or false

```json
{
  "id": "html-elements-a2",
  "type": "true-false",
  "question": "HTML describes page structure.",
  "correct": true,
  "explanation": "HTML gives content semantic structure."
}
```

`correct` must be a JSON Boolean, not the string `"true"`.

### Fill in the blank

```json
{
  "id": "html-elements-a3",
  "type": "fill-blank",
  "question": "HTML stands for HyperText ___ Language.",
  "acceptedAnswers": ["Markup"],
  "explanation": "HTML is the HyperText Markup Language."
}
```

Answers are compared without case differences and with leading/trailing and repeated whitespace normalised. List genuine variants only; do not include punctuation variants when wording can avoid them.

### Ordering

```json
{
  "id": "html-order-a1",
  "type": "ordering",
  "question": "Arrange the document from outer to inner.",
  "items": [
    { "id": "body", "text": "body" },
    { "id": "html", "text": "html" },
    { "id": "paragraph", "text": "paragraph" }
  ],
  "correctOrder": ["html", "body", "paragraph"],
  "explanation": "The html element contains body, which can contain a paragraph."
}
```

Item IDs must be unique within the activity. `correctOrder` must contain every item ID exactly once. Put `items` in a deliberately incorrect initial order.

## Add content

To add a lesson, create its Markdown and JSON files, then add one `{ "id", "title", "file" }` entry to the chapter's `lessons` array. Ordering in that array controls display and navigation.

To add a chapter, create a directory and `chapter.json`, then add one `{ "id", "manifest" }` entry to the course's `chapters` array.

To add a course, create its directories and manifests, then add one `{ "id", "manifest" }` entry to `content/courses.json`.

## Avoid common errors

- Duplicate or mismatched IDs cause progress and navigation errors.
- A leading `/` breaks project-subdirectory hosting.
- JSON does not allow comments or trailing commas.
- Paths and filenames are case-sensitive on GitHub Pages.
- An out-of-range `correctIndex`, string Boolean or incomplete `correctOrder` cannot be assessed correctly.
- Raw HTML is displayed as text; use supported Markdown.
- Do not put answers only in an explanation or write ambiguous trick questions.
- Do not modify `index.html`, CSS or JavaScript when adding content.

Before publishing, run `node scripts/validate-content.js`. It parses every JSON file, follows manifest and Markdown paths, checks required metadata, ID uniqueness, supported activity formats and further-study URLs. Also proofread each activity against its lesson.
