## Scene transitions

A scene contains GameObjects and components for a level, menu or other runtime context. Put a scene in the build configuration before loading it in a player build. Centralise transition rules instead of letting unrelated objects load arbitrary scenes.

Scene loading destroys ordinary objects from the previous scene. `DontDestroyOnLoad` can retain a root object, but careless use creates duplicates and hidden global state. A small bootstrap scene or explicit service lifetime is easier to reason about than marking many objects persistent.

Asynchronous loading avoids freezing while a large scene loads. Show progress carefully: file loading may complete before every object has finished its first frame of setup.

## Saving durable state

A save file should contain stable data needed to reconstruct progress: unlocked levels, settings, inventory identifiers and values. Do not serialise scene object references or implementation details that only make sense in one run.

Give the format a version. Validate loaded values and provide a migration or safe fallback when the schema changes. Write through a temporary file before replacing an important save so an interrupted write is less likely to destroy the previous version.

## Building and testing

Editor play mode is not the final runtime. Create a development build early and inspect its logs. Check scene inclusion, input devices, resolution, file paths and platform-specific behaviour. Profile a representative build rather than relying only on editor performance.

Before sharing, remove secrets and test on a clean machine or account. Record the Unity version, target platform and exact build steps so the result can be reproduced.
