## C++ in an Unreal project

Unreal Engine uses standard C++ plus engine types, helper functions and reflection macros. The language still supplies variables, functions, classes and control flow. Unreal adds tools that connect C++ code to the editor, Blueprints, memory management and engine systems.

A simple function has a return type, a name, parameters in parentheses and a body in braces:

```cpp
int32 CalculateTotalScore(int32 BaseScore, int32 BonusScore)
{
    return BaseScore + BonusScore;
}
```

`int32` is Unreal's explicitly sized signed integer type. The function accepts two values and returns their sum. Simple statements such as `return` and variable declarations end with a semicolon. Braces group the function body.

## Common types and names

You will often meet `int32` for whole numbers, `float` for decimal values, `double` for greater floating-point precision and `bool` for `true` or `false`. Unreal code generally uses **PascalCase** names for types, functions and variables. Boolean variables receive a lowercase `b` prefix:

```cpp
int32 RemainingLives = 3;
float WalkSpeed = 600.0f;
bool bIsAlive = true;
```

The `f` suffix makes `600.0f` a `float` literal. Comments beginning with `//` explain intent to readers and are ignored by the compiler.

Unreal type prefixes communicate a type's role. `ACharacter` is an Actor type, `UActorComponent` derives from UObject, and value types such as `FVector` use `F`. You do not invent these prefixes for ordinary local variables. Prefer clear names such as `DamageAmount` and `MaxHealth` over unexplained abbreviations.

> Unreal C++ is still C++. Engine conventions make code consistent, but the compiler enforces language rules such as matching types, braces and semicolons.
