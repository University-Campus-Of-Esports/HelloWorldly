## Test at useful boundaries

A **unit test** exercises a focused unit of behaviour with controlled collaborators. An **integration test** verifies that real components work together, such as application code with a database, filesystem or framework configuration. An end-to-end test follows a complete user journey through the assembled system.

No single scope is sufficient. Unit tests give fast, precise feedback. Integration tests reveal incorrect assumptions at boundaries. A small number of end-to-end tests protect critical journeys but are slower and harder to diagnose.

## Controlled collaborators

A **test double** replaces a collaborator in a test. A stub returns prepared values. A fake provides a lightweight working implementation, such as in-memory storage. A mock records interactions when the interaction itself is the requirement.

Prefer checking observable results over internal call sequences. Excessive mocking couples tests to implementation details and makes safe refactoring difficult.

## Reliable tests

Tests must be independent and deterministic. Set up their own state, avoid depending on execution order and clean up external resources. Control clocks and random values when results depend on them. Do not solve flaky tests by adding arbitrary delays.

Give a failing test one clear reason. If a large test can fail because of ten unrelated systems, its evidence is weak. Choose the smallest scope that can demonstrate the risk: unit tests for policy, integration tests for boundary contracts and end-to-end tests for a few essential flows.
