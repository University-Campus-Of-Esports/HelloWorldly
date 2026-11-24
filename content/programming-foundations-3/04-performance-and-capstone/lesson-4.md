## Performance is measured

Performance includes response time, throughput, memory, storage and energy use. Choose a measure that matters to the user or operating environment. Then collect a baseline with representative inputs.

A **profiler** or focused instrumentation identifies where resources are actually spent. Optimising code that contributes little to total cost adds complexity without meaningful benefit. After one targeted change, run correctness tests and repeat the same measurement. Record the environment and data so results can be compared.

Performance work often exchanges one resource for another. A cache may reduce calculation time while increasing memory use and introducing invalidation rules. Document that trade-off.

## Capstone scope

A suitable capstone might be a searchable catalogue, collaborative quiz service, small game system or data-processing tool. Define:

- Functional requirements describing what users can do
- Quality requirements with measurable thresholds
- A data model and ownership rules
- External boundaries and expected failures
- Security and privacy constraints
- A test and delivery plan

Build a thin end-to-end version first. Track work in small issues and commits. Use automated tests for core policy and focused integration tests for boundaries. Review dependencies and keep secrets out of the repository.

## Evidence and reflection

Deliver source code, setup instructions, a short architecture description and evidence that acceptance checks pass. Include a reproducible performance measurement where performance matters.

Conclude with an honest evaluation. Explain important decisions, alternatives, limitations and the next improvement you would make. A capstone is not evidence that a system is perfect; it is evidence that you can define a problem, make reasoned trade-offs, verify behaviour and communicate the result.
