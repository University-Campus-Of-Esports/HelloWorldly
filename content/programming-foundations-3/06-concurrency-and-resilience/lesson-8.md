## Bound the wait

Every remote call can stall. A **timeout** limits how long the caller is willing to wait. It should reflect the user journey and service expectations, not an arbitrary enormous value. Cancellation should propagate so abandoned work does not continue consuming resources.

Classify failures. Invalid input and permission denial are not repaired by retrying. A temporary unavailable response may be. Retry a limited number of times with **backoff** and random jitter so many clients do not retry together.

Only retry operations that are idempotent or protected by an idempotency key.

## Contain failure

A circuit breaker stops sending requests after repeated failures, then probes for recovery later. Bulkheads allocate separate resource limits so one failing dependency cannot consume every worker or connection. Rate limits protect finite capacity.

Graceful degradation preserves a smaller useful experience: show cached catalogue data when recommendations are unavailable, but do not pretend a payment succeeded when its result is unknown.

## Observe and recover

Record attempts, durations and final outcomes with correlation identifiers, without logging secrets. Alerts should represent user impact rather than every isolated error.

Resilience is not hiding failure. Return a clear error when correctness cannot be guaranteed. Test failure paths deliberately by injecting timeouts and unavailable dependencies in controlled environments. Recovery behaviour deserves the same design attention as the successful path.
