## Naming values

A **literal** is a value written directly, such as `42`, `3.5`, `true` or `"Ada"`. A **variable** associates a meaningful name with a value:

```text
playerName = "Ada"
score = 0
```

Assignment stores the value on the right in the variable on the left. It is not the same as a mathematical equality. After `score = score + 5`, the new score is five greater than its previous value.

A **constant** names a value that should not change while the program runs, such as a fixed maximum number of attempts.

## Types

A type describes which values are allowed and which operations make sense. Common types include whole numbers, decimal numbers, text and **Booleans**. A Boolean is either true or false and is useful for conditions such as `hasKey`.

Types prevent meaningless operations and affect results. Dividing two whole numbers may behave differently from dividing decimal numbers in some languages. Converting from one type to another should therefore be deliberate.

## Expressions

An **expression** combines values, variables and operators to produce a value:

```text
subtotal = price * quantity
isAffordable = subtotal <= balance
message = "Hello, " + playerName
```

Arithmetic operators calculate numbers. Comparison operators such as `<`, `>=` and `==` produce Booleans. Logical operators combine Boolean values: AND requires both conditions, while OR requires at least one.

Parentheses communicate and control evaluation order. Prefer `(basePrice + fee) * quantity` when that is the intended calculation. Meaningful names and explicit grouping make expressions easier to verify.
