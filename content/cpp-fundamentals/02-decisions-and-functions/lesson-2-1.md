## Choosing a path

An `if` statement runs a block only when its condition is true. Add `else if` for another condition and `else` as a final fallback:

```cpp
if (Health <= 0)
{
    HandleDefeat();
}
else if (Health < 25)
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

```cpp
for (int32 Index = 0; Index < 3; ++Index)
{
    SpawnPickup();
}
```

This loop runs for `Index` values 0, 1 and 2. Starting at zero is common because C++ container positions begin at zero.

A `while` loop repeats as long as a condition remains true:

```cpp
while (RemainingBots > 0)
{
    SpawnBot();
    --RemainingBots;
}
```

Something inside the loop must eventually make the condition false. Otherwise the game can become stuck in an infinite loop. `break` exits the nearest loop early, while `continue` skips to its next iteration.

Avoid expensive unbounded work in a single frame. Unreal games usually spread ongoing behaviour across events, timers or frame updates rather than running a long loop that blocks the game thread.
