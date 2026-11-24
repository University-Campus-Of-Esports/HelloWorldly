## Three reusable operations

Many collection algorithms follow three patterns. **Filter** keeps items satisfying a condition. **Map** transforms each item into a new value. **Reduce** combines items into one result using an accumulator.

```text
activeUsers = filter users where user.isActive
names = map activeUsers to user.displayName
summary = reduce names into comma-separated text
```

A pipeline can communicate the movement of data more clearly than one loop containing several flags and temporary collections. The original collection normally remains unchanged, which reduces unexpected shared state.

## Choosing clarity

A single loop may still be clearer when operations are tightly connected, performance measurements justify avoiding intermediate collections, or the language lacks expressive collection tools. Do not force a pipeline merely to appear sophisticated.

Keep transformation functions focused. A mapping function that also saves files, changes global state and sends messages is difficult to test and may run more often than expected. Functions without observable side effects are easier to rearrange and reuse.

Consider empty input. Filtering an empty collection produces an empty collection. Mapping does too. Reducing may require an explicit initial value; without one, there may be no valid result.

Name important intermediate results when a long chain becomes hard to read. The goal is to make the rule visible: first select eligible orders, then extract totals, then calculate the sum. Tests can cover each transformation and the complete pipeline with representative examples.
