## Input crosses a boundary

Keyboard input normally arrives as text, even when the user intends to enter a number. **Parsing** attempts to convert that text into a required type. **Validation** checks whether the converted value obeys the program's rules. These are separate questions: `-4` can be parsed as an integer but is not a valid age.

```text
repeat
    read ageText
    if ageText cannot be parsed as an integer
        display "Enter a whole number"
    else if age is outside 0 to 120
        display "Enter an age from 0 to 120"
until age is valid
```

Never use a fallback such as zero when zero is also a legitimate value; the program would lose the distinction between valid input and failure.

## Helpful validation

State the permitted format before asking. After failure, explain what needs changing without blaming the user. Preserve valid work where possible rather than clearing an entire form because one field is wrong.

Check boundaries deliberately. For a range from 1 through 10, test 0, 1, 10 and 11. Decide whether surrounding spaces should be ignored and whether case matters. Those decisions are part of the requirement.

Validation protects program assumptions, but it should not be duplicated everywhere. Validate at the input boundary, then pass a known-good value into the core calculation. This keeps the calculation focused and makes both parts easier to test.
