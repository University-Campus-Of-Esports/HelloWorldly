## Input represents intent

Unity's Input System can map controls to actions such as Move, Jump or Pause. Gameplay code responds to the action rather than scattering checks for specific keys. The same intent can then support keyboard, controller and rebinding.

Continuous values such as movement are read while an action is active. One-off actions have started, performed and cancelled phases. Enable and disable input with the owning object so inactive screens do not keep receiving commands.

Keep input translation separate from movement rules. An input component can produce a direction, while a character component decides speed, collision and whether movement is currently allowed.

## Events connect systems

An event announces that something occurred without naming every receiver. A health component can raise `HealthChanged`; a UI component subscribes and updates its bar. Audio and animation can listen independently.

Subscribe when the listener becomes active and unsubscribe when it becomes inactive. Forgotten subscriptions can call destroyed objects or apply an update more than once.

## UI presents state

The game model owns score, health and inventory. UI reads or observes that state; it should not become a second conflicting source of truth. Cache component references rather than searching the scene every frame.

Buttons expose click events. Validate serialized references in `Awake` or `OnValidate`, and design keyboard or controller focus as well as pointer interaction. Test different resolutions and avoid placing essential information outside safe screen areas. A clear separation between input, gameplay and presentation keeps each part replaceable.
