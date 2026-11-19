## Choosing a path

An `if` statement runs a block only when its condition is true. Add `else if` for another condition and `else` as a final fallback:

```csharp
if (health <= 0)
{
    HandleDefeat();
}
else if (health < 25)
{
    ShowLowHealthWarning();
}
else
{
    ContinuePlaying();
}
```

Conditions are tested from top to bottom, and only the first matching branch runs. Put the most specific or urgent cases first. Braces remain useful even for a one-line body because later edits are less likely to introduce mistakes.

## Repeating work

A `for` loop is useful when the repeat count is known. Its header initialises a counter, tests whether to continue and updates the counter:

```csharp
for (int index = 0; index < 3; index++)
{
    SpawnPickup();
}
```

This loop runs for `index` values 0, 1 and 2. Starting at zero is common because C# arrays and lists use zero-based positions.

A `while` loop repeats as long as a condition remains true:

```csharp
while (remainingBots > 0)
{
    SpawnBot();
    remainingBots--;
}
```

Something inside the loop must eventually make the condition false. Otherwise Unity can become stuck in an infinite loop and stop responding. `break` exits the nearest loop early, while `continue` skips to its next iteration.

Avoid expensive unbounded work in one frame. Unity games normally spread ongoing behaviour across events, coroutines or frame updates rather than running a long loop that blocks the main thread.
