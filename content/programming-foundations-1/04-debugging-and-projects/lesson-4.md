## Treat errors as evidence

A **syntax error** means code does not follow the language grammar. A **runtime error** happens while valid code executes, such as reading a missing file. A **logic error** allows the program to run but produces the wrong result.

Debugging should be systematic. Reproduce the problem with the smallest reliable input. State what you expected and what actually happened. Inspect values near the point where they first diverge. Then make one focused change and repeat the same test. Changing several things at once hides which change mattered.

Boundary cases are especially valuable: zero items, one item, the largest allowed value, empty text and invalid input. Keep successful cases too, because a fix must not break behaviour that already works.

## A first project

A number-guessing game, unit converter or short quiz is enough to combine the foundations. Write a small specification before coding:

- What inputs will the program accept?
- What output should it produce?
- Which invalid inputs need handling?
- Which functions divide the work?
- How will you decide that it is complete?

For a quiz, acceptance checks might say that the program shows every question, awards one point per correct answer and displays the final score. Convert each check into at least one test.

Build one thin working path first. For example, display one question, receive one answer and show a result. Then add repetition, scoring and validation. Save working versions regularly. This incremental approach limits the area you must investigate when new behaviour fails.

> Completing a small, tested program teaches more than starting a large unfinished one.
