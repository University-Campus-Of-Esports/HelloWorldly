## Framework responsibilities

A **Pawn** is an Actor that can be possessed. A Character adds a capsule, skeletal mesh and character movement. A Controller supplies intent to a possessed Pawn. `APlayerController` represents a player's control and can continue to exist when the controlled Pawn changes.

`AGameModeBase` defines authoritative match rules and exists only on the server in network play. `AGameStateBase` represents match state that clients need. `APlayerState` stores replicated information about one player. `UGameInstance` lasts across map travel within one running game but is not automatically a save file.

Choose the class from lifetime, authority and ownership rather than convenience.

## Enhanced Input

Enhanced Input represents intent with Input Actions such as Move, Look or Jump. Input Mapping Contexts connect devices and controls to those actions. Gameplay code binds an action's trigger events:

```text
bind MoveAction Triggered to HandleMove
bind JumpAction Started to StartJump
bind JumpAction Completed to StopJump
```

This separates the action from a particular key and supports controllers, rebinding and context changes. Add and remove mapping contexts deliberately when gameplay modes change.

Input values must still be validated by authoritative gameplay rules. A client request to move or activate an ability is intent, not proof that the action is allowed. Keep device translation in input code and movement or ability rules in the component that owns them.
