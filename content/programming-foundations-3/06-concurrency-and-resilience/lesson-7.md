## More than one flow

**Concurrency** means multiple tasks make progress during overlapping periods. **Parallelism** means work executes simultaneously. An event-loop application can be concurrent on one thread, while a calculation may run in parallel across processors.

When flows share mutable state, their operations can interleave. Two increments may both read 10, calculate 11 and write 11, losing one update. This timing-dependent defect is a **race condition**.

## Coordination

A lock protects a critical section so one owner updates shared state at a time. Locks require disciplined boundaries and ordering; acquiring multiple locks inconsistently can cause deadlock, where tasks wait forever for one another.

Atomic operations provide indivisible updates for limited cases. Immutable data avoids mutation races. Message passing gives one component ownership of state and sends it requests, reducing shared access.

## Structured lifetime

Concurrent tasks need ownership, cancellation and error propagation. Do not start background work that nobody observes or can stop. A parent operation should know when its child tasks finish and what happens if one fails.

Test concurrency with repeated and stressed scenarios, but recognise that timing tests cannot prove safety. Prefer designs whose invariants can be reasoned about: minimise shared mutable state, keep critical sections small and use established concurrency primitives rather than custom flags. Document whether operations are thread-safe and which component owns each changing value.
