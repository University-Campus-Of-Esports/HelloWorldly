## Types and instances

A **class** or similar custom type defines the data and operations associated with a concept. An **object** is one instance of that type. Two bank account objects follow the same definition but hold different balances.

```text
class Counter
    private value = 0

    increment()
        value = value + 1

    currentValue()
        return value
```

The object's state is its current data. Its methods describe permitted behaviour.

## Encapsulation

**Encapsulation** keeps implementation details behind a small public interface. If any code can assign a negative value directly to an account balance, the model cannot protect its rules. A withdrawal operation can instead check the requested amount and reject an invalid change.

Public operations should communicate intent. `markComplete()` is clearer and safer than exposing several internal flags for unrelated code to modify. Hiding data is not the goal by itself; preserving understandable responsibilities and valid state is.

## Composition and inheritance

**Composition** creates an object from other collaborating objects. A game character might use an inventory object and a health object. Each can be developed and tested separately.

**Inheritance** describes a specialised type in terms of a more general one. It can be valuable where a genuine substitutable relationship exists, but deep inheritance chains tightly couple behaviour and are difficult to change. Prefer composition when the relationship is “has a” or when responsibilities can vary independently.

An **interface** states which operations a collaborator provides without exposing its implementation. Code that saves a document could depend on a storage interface, allowing a file implementation in the application and a simple in-memory implementation in tests.
