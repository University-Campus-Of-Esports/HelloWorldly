## Design the system

Build a small networked catalogue, booking service, collaborative quiz or telemetry processor. Define users, trust boundaries, data ownership and measurable functional and quality requirements.

Include a relational data model with constraints and at least one atomic multi-step update. Expose a documented API. Protect untrusted input with validation and parameterised queries. Identify authentication needs and apply least privilege.

## Design failure behaviour

Choose timeouts and bounded retry only where safe. Make a write operation idempotent or explain how duplicate effects are prevented. Define cancellation and concurrency ownership. Demonstrate one failure scenario without corrupting state.

Use unit tests for policy, integration tests for database and API contracts, and a small end-to-end suite. Measure one meaningful performance characteristic with representative data before and after any optimisation.

## Deliver evidence

Create an automated pipeline that validates and builds a reproducible artifact. Document configuration without committing secrets. Add structured logs, a small metric set and a correlation identifier. Describe deployment, rollback and data migration.

The final report should map evidence to each requirement. Include an architecture diagram, threat assumptions, test results, performance method, known limitations and operational runbook. Explain at least two trade-offs where improving one quality cost another.

The goal is not production scale. It is demonstrating that you can reason across algorithms, data, concurrency, security, delivery and operations while keeping the system small enough to understand completely.
