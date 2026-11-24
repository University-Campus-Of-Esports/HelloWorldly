## Reuse with types

A **generic** definition uses a type parameter rather than naming one concrete type. `List<Score>` and `List<Player>` share list behaviour while still preventing a player from being inserted into a score list.

A generic function can express an algorithm once:

```text
function firstOrNone<T>(items: List<T>) returns optional T
    if items is empty
        return none
    return items[0]
```

The type parameter `T` connects the input element type to the return type. It does not mean “ignore types”.

## Constraints and contracts

Some algorithms require a capability. Sorting needs a way to compare values. A generic constraint can require that capability, or the function can accept a comparison function explicitly.

A **contract** states the assumptions and guarantees of an operation: valid inputs, returned result, state changes and possible failures. Type signatures express part of a contract, but names, documentation and tests communicate rules that the type system cannot.

## Useful abstraction

Create an abstraction when several cases share stable behaviour or when a boundary needs substitution. Avoid one-use interfaces and generic helpers that merely rename one line. Every abstraction adds a concept that readers must learn.

Start from concrete working examples. Extract the common rule only after you can name it clearly and explain what variation it permits. A good abstraction removes irrelevant differences while preserving important ones. If callers constantly work around it, the contract may be at the wrong level.
