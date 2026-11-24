## The development cycle

A code editor provides syntax highlighting, navigation and often an integrated debugger. The terminal runs commands in a current working directory. Learn where the project lives, which command runs it and where errors appear.

An **absolute path** identifies a location from a filesystem root. A **relative path** starts from the current directory. Relative project paths make work easier to move between computers.

Work in a short cycle: make one focused edit, run the program or tests, compare the result with expectations and investigate failures. Read the first relevant error carefully. Note the file and line, but also inspect the surrounding cause; the reported location is where a problem became visible, not always where it began.

## Preserving work

Version control records snapshots of project files. A basic Git workflow is:

```text
inspect changed files
stage one coherent change
commit with a descriptive message
```

Commit working increments frequently enough that each snapshot has a clear purpose. Review changes before committing. Do not commit passwords, API keys, personal data, build output or editor-specific clutter. A project-specific ignore file identifies generated files that Git should not track.

Use documentation to record setup and run commands. Future you is another user of the project. A short accurate README and a clean repository are part of a working program, not decoration added after the coding is finished.
