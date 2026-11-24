## Boundaries and validation

User input, files, networks and external libraries are **boundaries**: the program does not fully control what arrives. Validate data as it crosses a boundary. A loaded task should have a non-empty title and a recognised completion value before the rest of the application uses it.

Validation errors are expected outcomes and should produce useful messages. Internal defects are different. Catching every possible error and continuing silently can corrupt data and erase the evidence needed to diagnose a problem.

Use structured error handling where the language supports it:

```text
try
    text = read file
    tasks = parse and validate text
catch file-not-found
    offer to create an empty task list
catch invalid-data
    report which data could not be read
```

Clean up resources such as open files even when an operation fails.

## Persistence

**Persistence** lets information survive after a program stops. A common flow is serialisation: convert in-memory data to a documented file format, then reconstruct and validate it later. Write carefully so an interrupted save does not destroy the only valid copy. Temporary files or backups can make important updates safer.

## Modules

A **module** groups cohesive code behind a public interface. A task application might separate its data model, storage, user interface and reporting. The interface between modules should be smaller than their internal implementation.

Dependencies should point in deliberate directions. Core calculation code should not need to know how a button is drawn or which folder stores a file. This separation reduces the number of concepts that must change together and makes tests easier to arrange.
