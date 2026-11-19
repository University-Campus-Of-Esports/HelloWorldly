## From classes to objects

A **class** defines a type's data and behaviour. An **object** is an instance of that class. Unreal gameplay classes often derive from engine types. An `AActor` can exist in a world, while a `UActorComponent` adds reusable behaviour to an Actor.

Unreal's reflection macros let build tools generate code that connects selected C++ types to systems such as the editor, serialisation and Blueprints:

```cpp
UCLASS()
class ACollectable : public AActor
{
    GENERATED_BODY()

public:
    ACollectable();

protected:
    UPROPERTY(EditAnywhere, Category = "Collectable")
    int32 PointValue = 10;

    UFUNCTION(BlueprintCallable, Category = "Collectable")
    void Collect();
};
```

`UCLASS` marks the class, and `GENERATED_BODY` inserts required generated declarations. `UPROPERTY` exposes metadata for a member variable. `UFUNCTION` does the same for a function. The specifiers determine how each member participates; they do not make every member public C++.

## The Actor lifecycle

An Actor constructor establishes default values and creates default subobjects. It can run in editor and object-creation contexts, so it should not depend on a finished game world.

`BeginPlay` runs when play begins for an Actor instance. Use it for startup work that needs the world or other runtime objects. `Tick` can run every frame when ticking is enabled:

```cpp
void ACollectable::BeginPlay()
{
    Super::BeginPlay();
}
```

Call the parent implementation when overriding engine lifecycle functions unless the API specifically says otherwise. Avoid enabling `Tick` for every Actor by default; events and timers are often clearer and cheaper for behaviour that does not need per-frame updates.

Access labels such as `public`, `protected` and `private` control which C++ code may use members. Keep internal details private or protected and expose a small, intentional interface.
