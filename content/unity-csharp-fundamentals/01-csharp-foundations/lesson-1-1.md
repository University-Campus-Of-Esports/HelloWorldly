## C# in a Unity project

Unity gameplay scripts use C# together with types and services from the `UnityEngine` namespace. A common script derives from `MonoBehaviour`, allowing Unity to attach an instance of that class to a GameObject as a component.

```csharp
using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    private int currentHealth = 100;

    public void TakeDamage(int damageAmount)
    {
        currentHealth -= damageAmount;
        Debug.Log($"Health: {currentHealth}");
    }
}
```

The class body is enclosed in braces. `TakeDamage` is a method with one integer parameter. Its statements end with semicolons. `Debug.Log` writes a message to the Unity Console, and the `$` before the string allows the value of `currentHealth` to be inserted.

## Types and names

Common C# types include `int` for whole numbers, `float` for decimal values, `bool` for `true` or `false`, and `string` for text. Unity adds structures such as `Vector2`, `Vector3`, `Color` and `Quaternion`.

```csharp
int remainingLives = 3;
float moveSpeed = 5f;
bool isAlive = true;
Vector3 spawnPosition = Vector3.zero;
```

The `f` suffix makes `5f` a `float` literal. Without it, a decimal literal is a `double` by default.

C# code commonly uses **PascalCase** for classes and methods and **camelCase** for local variables and parameters. Field conventions vary between teams, so follow the project's established style consistently. Names such as `damageAmount` and `remainingLives` communicate intent more clearly than unexplained abbreviations.

> Unity supplies the engine-facing API, while C# supplies language rules such as types, methods, braces and semicolons.
