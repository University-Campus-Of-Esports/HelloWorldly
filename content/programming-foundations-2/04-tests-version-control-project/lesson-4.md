## Automated checks

An automated test runs behaviour with controlled inputs and checks an observable result. A focused test commonly follows three stages: arrange the state, act by calling the behaviour and assert the expected outcome.

```text
arrange an empty basket
act by adding an item priced at 5
assert that the total is 5
```

Test normal examples, boundaries and expected failures. Tests should be deterministic: the same program state should produce the same result. Avoid coupling a small calculation test to a real network, clock or user interface when a controlled substitute will do.

Tests do not prove that no defect exists. They record important expectations and warn when a later change violates one.

## Version control

Version control records meaningful snapshots called **commits**. A useful commit contains one coherent change and a message explaining its purpose. A **branch** provides an independent line of work that can later be reviewed and merged.

Commit after a verified increment, not only at the end of a project. Before sharing changes, review the difference, run tests and exclude secrets or generated clutter.

## Intermediate project

Build a task tracker, small inventory or score history. Include a data model, at least two collection operations, file persistence, validation and automated tests. Separate the model, storage and interface into modules.

Develop in vertical slices. First create and display one in-memory item. Then support collections, saving, loading and validation. Give every slice an acceptance check and a coherent commit. Finish with a short README explaining how to run the program, its design and any remaining limitations.
