# Reusable HelloWordly Content Prompt

Copy the prompt below, replace every bracketed value, and give it to a coding agent with repository access or to a chatbot together with `CONTENT_GUIDE.md` and representative example files.

---

You are creating content for the static HelloWordly educational application.

## Inputs

- Course name: `[COURSE NAME]`
- Chapter name: `[CHAPTER NAME]`
- Subject: `[SUBJECT]`
- Target audience: `[TARGET AUDIENCE]`
- Difficulty: `[DIFFICULTY]`
- Number of lessons: `[NUMBER OF LESSONS]`
- Learning outcomes: `[LEARNING OUTCOMES]`
- Estimated duration: `[ESTIMATED DURATION]`
- Categories and topics: `[CONTROLLED CATEGORIES AND TOPICS]`
- Series and part: `[SERIES ID AND PART, IF APPLICABLE]`
- Prerequisites and tools: `[PREREQUISITES AND TOOLS]`

## Task

Create a complete, publication-ready HelloWordly chapter from these inputs in one pass.

1. Read `CONTENT_GUIDE.md` completely before making files.
2. Inspect `content/courses.json`, the target course manifest, and at least one complete example chapter and lesson.
3. Follow the existing JSON schema, naming conventions and relative-path rules exactly. Reuse no existing course, chapter, lesson, activity or ordering-item ID where uniqueness is required.
4. Plan the requested number of short lessons so their combined learning outcomes cover the supplied outcomes without unnecessary repetition.
5. For every lesson, write a separate Markdown file with a short introduction, clear explanations, concrete examples, and approximately 200–350 words of core content. Match the audience, difficulty and estimated duration. Use clear UK English unless the course establishes another convention.
6. For every lesson, create a JSON file containing its metadata, learning outcomes and two or three activities. Use only `multiple-choice`, `true-false`, `fill-blank` and `ordering`. Vary the types across the chapter.
7. Supply an unambiguous correct answer and a useful explanation for every activity. Multiple-choice indices are zero-based; true/false answers are Booleans; fill-in answers include sensible accepted variants; ordering answers contain every stable item ID exactly once and start visibly out of order.
8. Give every chapter lesson entry a positive integer `version` and an `estimatedMinutes` value. Increment the version when changing completion requirements.
9. Create or update the chapter manifest so lessons appear in a sensible order. If this is a new chapter, update the target course manifest. If the course is new, include its overview, controlled categories and topics, difficulty, series, duration, prerequisites, tools, status and two authoritative HTTPS further-study links, then update `content/courses.json`.
10. Run `node scripts/validate-content.js`, then proofread answers against the teaching text.
11. Do not modify application JavaScript, HTML, CSS, deployment files or unrelated content. Do not add dependencies, code execution, external APIs or unsupported Markdown.

If you can edit the repository, create and update the files directly, run available static checks without starting a server or browser, and report the exact files changed and validation results.

If you cannot edit the repository, output every complete file in a separately labelled fenced block, including its repository-relative path. Include complete replacement content for each manifest that must change, followed by a concise validation checklist. Do not use placeholders in generated files.

---
