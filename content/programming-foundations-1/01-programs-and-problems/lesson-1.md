## Input, processing and output

A **program** is a set of instructions that a computer can execute. Most programs can be described using three ideas: input, processing and output. A temperature converter receives a number as input, applies a formula during processing and displays a converted number as output. Inputs can also come from files, sensors or other programs.

Before choosing a programming language, define the result you need. Ask what information is available, what rules transform it and what should happen when information is missing or invalid.

## Algorithms and pseudocode

An **algorithm** is a finite sequence of precise steps for solving a problem. **Pseudocode** records those steps without requiring the exact syntax of a programming language:

```text
read price
read quantity
total = price multiplied by quantity
display total
```

Each instruction has one clear purpose. A computer cannot infer what “make the total sensible” means, so vague requirements must become explicit rules.

## Decomposition and examples

Large goals become manageable through **decomposition**. A quiz application might be separated into loading questions, showing one question, checking an answer, keeping a score and presenting the result. Each task can be reasoned about and tested separately.

Use concrete examples before coding. For a price of 4 and quantity of 3, the expected total is 12. Also consider boundaries and unusual cases: zero quantity, a negative price or text where a number is expected. These examples reveal missing decisions in the algorithm.

> A good first algorithm is not clever. It is clear, finite and testable.
