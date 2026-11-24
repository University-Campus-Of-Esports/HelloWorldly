## All or nothing

A **transaction** groups operations into one unit. Atomicity means either every required change commits or none does. A money transfer must not debit one account without crediting the other.

Transactions also help observers see consistent state. Keep them short: a transaction that waits for user input or a slow network call can hold locks and block other work.

## Concurrent updates

Two operations may read the same value, calculate separate updates and then overwrite one another. Systems prevent or detect this with locking, isolation levels, version columns or compare-and-swap operations. The right choice balances correctness, throughput and complexity.

State important invariants explicitly. An inventory quantity must not fall below zero; a username must remain unique. Enforce critical rules in the database as well as in user-facing validation, because multiple application instances may update data.

## Retrying safely

A connection can fail after a server commits but before the client receives confirmation. A blind retry might apply the same payment twice. An **idempotency key** identifies the logical request so the server can return the original result rather than repeat its effect.

Not every transaction spans one database. Workflows involving messages or external services often use durable events, compensating actions and explicit states. Design for partial failure instead of assuming a distributed operation can be made instantly atomic. Record enough evidence to reconcile uncertain outcomes.
