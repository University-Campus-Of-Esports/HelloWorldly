## Choose a finishable problem

Build a command-line expense summary, flash-card quiz, text adventure or habit tracker. Limit the first version to one clear user journey. Write acceptance criteria before implementation:

- The user can enter and validate required data.
- The program stores several related values in a list.
- At least one function calculates a result.
- Normal, boundary and invalid examples behave predictably.
- Instructions explain how to run the program.

Sketch the input-processing-output flow and divide it into functions. Give state a clear owner and avoid unrelated global variables.

## Build vertically

Create a thin end-to-end version first. A habit tracker might accept one habit and display it before supporting multiple items, completion counts and menus. Run the program after each small change and commit known-working increments.

Separate input and output from core calculations. A function that calculates a percentage should accept numbers and return a number; another part can parse text and format the display. This makes calculation tests straightforward.

## Demonstrate the foundations

Prepare a short test table with inputs, expected results and actual results. Include empty input, minimum and maximum allowed values, and an invalid type. Fix defects using a reproducible case rather than guessing.

Finally review the code against the learning outcomes. Can another reader follow the names and control flow? Are repeated operations in functions? Are loops guaranteed to finish? Does validation protect every boundary? Document limitations honestly and name one sensible next improvement. A finished, explained project is the strongest evidence that the basics have become usable skills.
