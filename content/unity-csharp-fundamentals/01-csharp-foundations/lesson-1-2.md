## Storing gameplay state

A variable associates a name with a typed value. Declare the type first, followed by the name. An initialiser supplies its first value:

```csharp
int currentHealth = 100;
const int maximumHealth = 100;
float stamina = 75f;
```

`currentHealth` and `stamina` can change. `maximumHealth` is a compile-time constant, so later code cannot assign another value to it. Use `const` for values known at compile time that must remain fixed. A `readonly` field is another option when a value can only be assigned during initialisation or in a constructor.

Assignment uses one equals sign. Arithmetic operators calculate new values:

```csharp
currentHealth = currentHealth - 20;
stamina += 10f;
```

The second statement is a compact form of `stamina = stamina + 10f`. Similar compound operators include `-=`, `*=` and `/=`. Integer division discards a fractional remainder, so `5 / 2` produces `2`. Use a floating-point operand when the fraction matters.

## Building conditions

Comparisons produce a Boolean result. `==` tests equality, while `!=` tests inequality. The operators `<`, `>`, `<=` and `>=` compare ordered values.

Logical operators combine conditions:

- `&&` is true only when both conditions are true.
- `||` is true when either condition is true.
- `!` reverses a Boolean value.

```csharp
bool canSprint = stamina > 0f && currentHealth > 0;
bool needsHealing = currentHealth < maximumHealth;
```

Do not confuse assignment (`=`) with equality (`==`). Assignment changes a variable; equality asks whether values match. Parentheses can clarify the intended order of a complex expression.

Use names that include important units. `cooldownSeconds` communicates more than `cooldown`, and helps prevent code from mixing seconds, frames and other measurements.
