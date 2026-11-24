## Design for change

Software architecture is the organisation of responsibilities and dependencies. It should make common changes local and important rules visible. A module with **high cohesion** contains elements that contribute to one focused purpose. **Coupling** describes how strongly modules depend on one another.

An order-total rule is core policy. A web page, database and payment provider are implementation details around that policy. If the calculation directly imports a particular database driver, testing and changing storage become unnecessarily difficult.

## Boundaries and dependency direction

Define a boundary using an interface owned by the code that needs the capability:

```text
interface OrderRepository
    findOrder(id)
    saveOrder(order)
```

The core operation depends on this abstraction. A database adapter implements it. Tests can use an in-memory implementation. This **dependency inversion** keeps policy from depending directly on a volatile external detail.

Do not add layers mechanically. Every boundary has a cost: more types, translation and navigation. Add one where responsibilities differ, an external system is likely to change or independent testing has clear value.

## Make decisions visible

Record significant choices and their trade-offs. Explain why a boundary exists, what alternatives were considered and what conditions would cause the decision to change. Avoid claiming that one pattern is universally best.

Architecture also includes data ownership and failure behaviour. Decide which component may update each important value, how operations report failure and whether a partially completed operation can be retried safely. Clear contracts make collaboration between modules predictable.
