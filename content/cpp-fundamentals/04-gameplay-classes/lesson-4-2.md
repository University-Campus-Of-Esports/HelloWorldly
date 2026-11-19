## Referring to an object

A pointer stores the address of an object rather than containing the object itself. A pointer can refer to no object, represented by `nullptr`:

```cpp
AActor* CurrentTarget = nullptr;
```

The `*` in the declaration makes `CurrentTarget` a pointer. Before using an optional pointer, check it. Calling a function through a null or invalid pointer can crash the game.

```cpp
if (IsValid(CurrentTarget))
{
    CurrentTarget->SetActorHiddenInGame(true);
}
```

`->` accesses a member through a pointer. Unreal's `IsValid` checks that a UObject pointer is non-null and that the object is not pending destruction. A simple `if (CurrentTarget)` only checks for null, which may be sufficient in tightly controlled code but does not perform the extra UObject validity check.

## Reflected object properties

Unreal Engine manages the lifetimes of UObjects through garbage collection. References that need to persist should participate correctly in that system. In modern Unreal Engine 5 code, an object property may look like this:

```cpp
UPROPERTY(EditAnywhere, Category = "Targeting")
TObjectPtr<AActor> CurrentTarget;
```

`UPROPERTY` makes the reference visible to Unreal's reflection and object-tracking systems. `TObjectPtr` is a wrapper used for UObject properties while behaving much like a pointer in ordinary access. Project and engine-version conventions determine where raw UObject pointers or other pointer wrappers are appropriate.

Do not manually `delete` an Actor or UObject managed by Unreal. Actors are normally removed with `Destroy`, while UObjects are reclaimed when the engine determines that no tracked strong references keep them alive.

References (`Type&`) differ from pointers: a reference aliases an existing value and is normally expected to be valid, while a pointer can explicitly be `nullptr`. Choose the form that communicates whether “no object” is a legitimate state.
