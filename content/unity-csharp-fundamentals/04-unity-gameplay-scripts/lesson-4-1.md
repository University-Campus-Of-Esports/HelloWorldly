## Initialising a component

Unity invokes specially named `MonoBehaviour` methods, often called event functions or messages. You do not call them to run the normal lifecycle.

`Awake` runs when Unity loads an active script instance. Use it to establish the component's own state and cache local references. `Start` runs before the component's first `Update`, provided the component is enabled. It is useful for setup that expects other active objects to have completed `Awake`.

```csharp
private Rigidbody body;

private void Awake()
{
    body = GetComponent<Rigidbody>();
}

private void Start()
{
    Debug.Log("Player ready");
}
```

Do not rely on the relative `Awake` order of different GameObjects. If one script must run before another, design an explicit dependency or configure script execution order deliberately.

## Updating over time

`Update` runs once per rendered frame while the component is active and enabled. Frame duration varies, so multiply per-second changes by `Time.deltaTime`:

```csharp
private void Update()
{
    transform.Rotate(0f, turnSpeed * Time.deltaTime, 0f);
}
```

Without `deltaTime`, the object would rotate farther each second on a faster computer because more frames run.

`FixedUpdate` runs on a fixed timestep used by Unity physics. Put regular `Rigidbody` forces or physics movement there. Input events are commonly gathered outside `FixedUpdate` and then applied during the physics step.

Not every component needs `Update`. Events, animation callbacks, coroutines and timers can express occasional work without running a method every frame. Empty lifecycle methods still create noise, so remove generated methods that the script does not use.

`OnEnable` and `OnDisable` are useful for subscribing to and unsubscribing from events when a component becomes active or inactive.
