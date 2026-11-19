## Storing game state

A variable associates a name with a typed value. Declare the type first, followed by the name. An **initialiser** supplies the first value:

```cpp
int32 CurrentHealth = 100;
const int32 MaxHealth = 100;
float Stamina = 75.0f;
```

`CurrentHealth` can change. `MaxHealth` is marked `const`, so code cannot assign another value to it after initialisation. Use `const` when a value should remain fixed; the compiler can then catch accidental changes.

Assignment uses one equals sign. Arithmetic operators calculate values:

```cpp
CurrentHealth = CurrentHealth - 20;
Stamina += 10.0f;
```

The second statement is a compact form of `Stamina = Stamina + 10.0f`. Similar compound operators include `-=`, `*=` and `/=`. Integer division discards a fractional remainder, so `5 / 2` produces `2`. Use floating-point values when the fraction matters.

## Asking questions with expressions

Comparisons produce a Boolean result. `==` tests equality, while `!=` tests inequality. The operators `<`, `>`, `<=` and `>=` compare ordered values.

Logical operators combine conditions:

- `&&` is true only when both conditions are true.
- `||` is true when either condition is true.
- `!` reverses a Boolean value.

```cpp
const bool bCanSprint = Stamina > 0.0f && CurrentHealth > 0;
const bool bNeedsHealing = CurrentHealth < MaxHealth;
```

Do not confuse assignment (`=`) with equality (`==`). Assignment changes a variable; equality asks whether two values match. Parentheses can make a complex expression's intended order clear.

In gameplay code, use meaningful units and names. `CooldownSeconds` communicates more than `Cooldown`, and `DamagePerSecond` is clearer than `DPS` when an abbreviation is not already established in the project.
