## Referencing scene objects and assets

A field can hold a reference to a component, GameObject or prefab asset. A private serialised field lets a designer assign that reference in the Inspector:

```csharp
[SerializeField] private GameObject projectilePrefab;
[SerializeField] private Transform spawnPoint;
```

An unassigned reference has a null value. Check optional references before using them, and report required configuration clearly:

```csharp
if (projectilePrefab == null)
{
    Debug.LogError("Projectile prefab is not assigned", this);
    return;
}
```

Unity objects have special lifetime behaviour. After a Unity object is destroyed, its managed C# wrapper can remain briefly but compares equal to `null`. For that reason, use Unity's normal null comparison with `UnityEngine.Object` references and be cautious with null-conditional operators on them.

## Creating and removing objects

`Instantiate` creates a runtime copy of a prefab. Supply a position and rotation to place it:

```csharp
GameObject projectile = Instantiate(
    projectilePrefab,
    spawnPoint.position,
    spawnPoint.rotation
);
```

The returned reference identifies the new instance, not the prefab asset. Code can retrieve a component from that instance or store it for later use.

Use `Destroy` to remove a Unity object:

```csharp
Destroy(projectile, 5f);
```

The optional delay here removes the projectile after five seconds. Destruction is deferred until after the current update loop, so do not assume the underlying object disappears at the exact line of the call.

Repeatedly creating and destroying many short-lived objects can produce allocations and performance spikes. Production systems often reuse projectiles or effects through object pooling. Begin with correct `Instantiate` and `Destroy` behaviour, then optimise after profiling demonstrates a need.

Keep ownership clear: the code that creates an object should establish who is responsible for configuring it and deciding when it is removed.
