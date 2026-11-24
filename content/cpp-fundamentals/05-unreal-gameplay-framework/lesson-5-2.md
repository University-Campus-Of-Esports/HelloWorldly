## Broadcasting events

An Unreal delegate stores a callable target. A multicast delegate can notify several listeners. A health component can broadcast `OnHealthChanged`; a widget, sound component and animation system respond without the health component depending directly on them.

Native delegates suit C++-only communication. Dynamic delegates support reflection and Blueprint binding with additional overhead. Bind and unbind according to object lifetime. UObject-aware bindings help avoid calls to destroyed objects, but ownership should still be clear.

Use events for facts that occurred, not as a hidden replacement for every direct dependency.

## UI presents gameplay state

UMG widgets display state and send user intent. The gameplay model remains authoritative. A health bar observes a health component; it should not independently decide the player's real health.

Create and retain widget references deliberately. Avoid expensive world searches or complex property bindings every frame when an event can update the display only after state changes. Design focus and navigation for keyboard and controller as well as pointer input.

## Durable saves

A `USaveGame` subclass contains serialisable values. Save stable identifiers, settings and progress needed to reconstruct the world. Do not save raw pointers to temporary Actors.

Include a format version and validate loaded ranges. Plan what happens when classes or identifiers change in a later build. Perform large saves without blocking a frame where practical, and report success or failure honestly.

`UGameInstance` can retain state during map travel, but only a saved durable representation survives after the application exits.
