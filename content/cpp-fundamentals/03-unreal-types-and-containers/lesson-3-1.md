## Three kinds of text

Unreal provides three commonly used text types, each with a different purpose.

- `FString` is a mutable character string. Use it when building, searching or changing text.
- `FName` is an efficient name value used for identifiers that are compared often, such as socket or row names.
- `FText` is display text with localisation support. Use it for words and sentences shown to players.

Choosing by purpose avoids unnecessary conversion and preserves localisation data. Do not store player-facing sentences as `FName` merely because it looks convenient.

The `TEXT` macro creates an Unreal-compatible string literal:

```cpp
FString PlayerName = TEXT("Ari");
FName WeaponSocket = TEXT("WeaponSocket");
FText StartLabel = FText::FromString(TEXT("Start Game"));
```

`FText::FromString` is useful for text created at runtime, but a hard-coded user-interface phrase should normally use Unreal's localisation-aware text macros or editor properties in production code.

## Formatting and logging

`FString::Printf` builds a formatted string. Format specifiers describe the supplied values:

```cpp
const int32 Score = 250;
const FString Message = FString::Printf(TEXT("Score: %d"), Score);
UE_LOG(LogTemp, Log, TEXT("%s"), *Message);
```

`%d` formats an integer. `%s` expects character data, and dereferencing an `FString` with `*Message` provides it for this API. Format strings and arguments must agree; a mismatch can produce incorrect output or a crash.

For on-screen, localised values, `FText::Format` is preferable because it keeps the result in the `FText` system. Logging is for developers, so `FString` and `UE_LOG` are common there.

> Treat text type selection as part of the design: manipulation suggests FString, identity suggests FName, and user display suggests FText.
