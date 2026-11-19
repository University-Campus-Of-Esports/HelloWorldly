## Inputs and outputs

A method packages an operation behind a descriptive name. Its **parameters** describe expected inputs, and its return type describes the output:

```csharp
private float CalculateDamage(float baseDamage, float multiplier)
{
    float finalDamage = baseDamage * multiplier;
    return finalDamage;
}
```

Calling `CalculateDamage(20f, 1.5f)` supplies two **arguments** and produces `30f`. Each argument must be compatible with its parameter type. A method with a `void` return type performs work but returns no value.

Keep methods focused on one responsibility. `CalculateDamage` is easier to understand and test than a method that calculates damage, updates the interface and plays audio at the same time. Method names normally use PascalCase and begin with a verb, such as `ApplyDamage`, `FindTarget` or `UpdateScore`.

## Controlling access

Access modifiers describe where a member can be used. `private` members are available only inside their class. `public` members form part of the class's external interface. Use the narrowest access that supports the design.

```csharp
public int Score { get; private set; }

public void AddScore(int points)
{
    if (points > 0)
    {
        Score += points;
    }
}
```

This property can be read publicly, but only code inside its containing class can set it. Other code must use `AddScore`, which protects the rule that points must be positive.

Parameters of value types such as `int`, `float`, `bool` and `Vector3` are copied by default. Class variables hold references to objects, although the reference itself is still passed by value unless `ref` or `out` is specified. Beginners should prefer clear return values and ordinary parameters before reaching for `ref`.
