## A dynamic Unreal container

`TArray` stores an ordered sequence of elements of one type. It grows and shrinks as elements are added or removed. The element type appears between angle brackets:

```cpp
TArray<FString> Inventory;
Inventory.Add(TEXT("Health Potion"));
Inventory.Add(TEXT("Key"));
```

`Inventory.Num()` returns the number of elements. Positions are zero-based, so the valid indices for two elements are 0 and 1. Reading beyond the valid range is an error. Check first when an index might come from gameplay or user input:

```cpp
if (Inventory.IsValidIndex(SelectedIndex))
{
    const FString& SelectedItem = Inventory[SelectedIndex];
}
```

The reference avoids copying the string, and `const` prevents this code from changing it.

## Visiting and changing elements

A range-based `for` loop reads each element without managing an index:

```cpp
for (const FString& ItemName : Inventory)
{
    UE_LOG(LogTemp, Log, TEXT("Item: %s"), *ItemName);
}
```

Use a normal indexed loop when the position itself matters. Common operations include `Contains` to test for a value, `Remove` to remove matching values, `RemoveAt` to remove by position and `Empty` to clear the array.

```cpp
if (Inventory.Contains(TEXT("Key")))
{
    Inventory.Remove(TEXT("Key"));
}
```

Removing elements can shift later indices and invalidate references or pointers to stored elements. Do not keep an element reference while changing the array unless you understand the operation's invalidation rules.

Unreal also provides containers such as `TSet` for unique values and `TMap` for key-value pairs. Start with `TArray` when order and indexed access are useful, then choose another container when its behaviour better matches the data.
