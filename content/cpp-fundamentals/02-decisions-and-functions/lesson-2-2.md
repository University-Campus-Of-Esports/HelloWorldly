## Inputs and outputs

A function packages an operation behind a descriptive name. Its **parameters** describe expected inputs, and its return type describes the output:

```cpp
float CalculateDamage(float BaseDamage, float Multiplier)
{
    const float FinalDamage = BaseDamage * Multiplier;
    return FinalDamage;
}
```

Calling `CalculateDamage(20.0f, 1.5f)` supplies two **arguments** and produces `30.0f`. Each argument must be compatible with its parameter type. A function with a `void` return type performs work but returns no value.

Keep functions focused on one responsibility. `CalculateDamage` is easier to understand and test than a function that calculates damage, updates the interface and plays audio at the same time. Unreal function names generally begin with a verb, such as `ApplyDamage`, `FindTarget` or `UpdateScore`.

## Values and references

Normal value parameters receive copies. Copying small types such as `int32`, `float` and `bool` is appropriate. Larger Unreal types are often passed by reference. Add `const` when the function only needs to read the value:

```cpp
void PrintPlayerName(const FString& PlayerName)
{
    UE_LOG(LogTemp, Log, TEXT("Player: %s"), *PlayerName);
}
```

`&` makes `PlayerName` a reference to the caller's string instead of a copy. `const` prevents this function from changing that string through the reference. The `*PlayerName` expression supplies the character data expected by this particular `UE_LOG` format specifier.

A non-const reference can modify the caller's value, but an explicit return value is often clearer for a single result. Use references deliberately, and keep parameter order consistent across related functions.

Function declarations commonly appear in a header file (`.h`), while definitions appear in a source file (`.cpp`). Unreal's build tools compile these files into a module.
