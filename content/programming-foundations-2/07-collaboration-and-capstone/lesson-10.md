## Project brief

Build a task manager, inventory tool, media catalogue or score tracker. The application must manage a collection of modelled objects, validate input, save and load a documented format, and recover usefully from expected errors.

Separate at least three responsibilities: domain rules, persistence and user interaction. Define the interfaces between them before choosing implementation details. Use a generic or reusable operation only where it makes the contract clearer.

## Verification strategy

Write unit tests for calculations and state transitions. Add integration tests for the real persistence boundary, including missing and invalid data. Use one or two end-to-end acceptance checks for critical user journeys.

Include a regression test for every substantial defect found during development. Keep tests deterministic and give each one controlled state.

## Delivery

Develop on focused branches or commits. Review diffs, resolve conflicts deliberately and keep the main branch working. A README should document prerequisites, setup, run and test commands, the data location and known limitations.

Add a short architecture note showing modules and dependency direction. Explain one refactoring that improved cohesion or reduced coupling. Provide evidence that acceptance checks pass.

Conclude by evaluating the design against actual change. Which requirement was easiest to add, which boundary caused difficulty and which abstraction would you retain or remove? This reflection distinguishes a collection of features from a maintainable intermediate project.
