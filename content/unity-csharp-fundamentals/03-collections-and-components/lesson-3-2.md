## Building with components

A GameObject is a scene object that holds components. Every GameObject has a `Transform`; other components add rendering, physics, audio or custom behaviour. A class derived from `MonoBehaviour` becomes a custom component when attached to a GameObject.

Prefer small components with clear responsibilities. A health component can manage damage without also controlling movement and sound. Components can then be combined differently across players, enemies and destructible props.

Unity serialises supported fields so their values can be saved in scenes and prefabs. A private field marked with `[SerializeField]` remains private to C# code while appearing in the Inspector:

```csharp
public class PlayerMover : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private Rigidbody body;
}
```

Assigning `body` in the Inspector makes the dependency visible. Avoid making a field public solely to expose it; public access also allows unrelated code to change it.

## Finding a component

`GetComponent<T>()` searches the same GameObject for a component of type `T`. Cache a reference when it will be used repeatedly:

```csharp
private Rigidbody body;

private void Awake()
{
    body = GetComponent<Rigidbody>();
}
```

If the component is optional, check the result before use. `TryGetComponent` combines retrieval and checking:

```csharp
if (TryGetComponent(out AudioSource audioSource))
{
    audioSource.Play();
}
```

Repeated scene-wide searches can be difficult to reason about and needlessly expensive. Prefer Inspector references, cached local components, or an explicit owner that provides dependencies.

Unity may report a missing component reference as `null`. A required component can also be documented with `[RequireComponent(typeof(Rigidbody))]`, helping the Editor keep that dependency attached.
