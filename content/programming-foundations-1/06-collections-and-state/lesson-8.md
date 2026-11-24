## Visibility and duration

**Scope** is the region where a name can be used. A variable declared inside a function is normally local to that function. A variable inside a conditional block may have an even narrower scope.

```text
function finalPrice(price, taxRate)
    tax = price * taxRate
    return price + tax
```

`price`, `taxRate` and `tax` are implementation details of this call. Other functions cannot accidentally reuse or overwrite them.

**Lifetime** describes how long a value exists. A local value commonly lasts until a function returns, while an object referenced by longer-lived state can remain afterwards. Scope and lifetime are related but not identical.

## Managing state

**State** is information that can change over time: a score, current screen or shopping basket. Keep state close to the behaviour responsible for it. Pass required values into functions and return results rather than allowing functions to read and change unrelated global variables.

Global mutable state creates hidden dependencies. A calculation may produce different results because another part of the program changed a global setting. Tests then depend on execution order and become harder to isolate.

Constants and immutable values are easier to reason about because they cannot change after creation. Mutation is sometimes necessary, but make ownership clear: identify which function or component is allowed to update each piece of important state. Narrow scope, deliberate lifetime and explicit data flow make larger programs understandable.
