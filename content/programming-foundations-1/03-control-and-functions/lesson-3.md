## Choosing a path

Programs use a **branch** when behaviour depends on a condition:

```text
if temperature < 0
    display "Freezing"
else
    display "Above freezing"
```

The condition produces a Boolean. More alternatives can be added, but their order matters: test specific cases before a broad fallback. Every important path should have an example that demonstrates its expected result.

## Repeating work

A **loop** repeats a block of instructions. Use a count-controlled loop when the number of repetitions is known, such as processing five attempts. Use a condition-controlled loop when repetition continues until something changes:

```text
while answer is not valid
    read another answer
```

Every condition-controlled loop needs a way to become false. Otherwise it may never finish. When processing a collection, a loop can visit each item without duplicating the same instructions.

## Functions

A **function** gives a name to a reusable operation. Its **parameters** receive inputs, and it may return an output:

```text
function calculateArea(width, height)
    return width * height
```

Calling `calculateArea(4, 3)` supplies arguments and produces 12. Some functions perform an action instead of returning a value, but separating calculation from display often makes code easier to test.

Give each function one clear responsibility and a name that describes it. A function called `calculateTotal` should not unexpectedly save a file or change an unrelated score. Small functions also support decomposition: a larger algorithm becomes a sequence of well-named operations.
