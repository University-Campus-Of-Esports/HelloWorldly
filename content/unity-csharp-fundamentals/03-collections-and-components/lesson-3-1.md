## Fixed and resizable collections

An array stores a fixed number of values of one element type. Its size is chosen when the array is created:

```csharp
string[] weaponNames = { "Sword", "Bow", "Staff" };
string firstWeapon = weaponNames[0];
```

Array positions begin at zero. An array with three elements has valid indices 0, 1 and 2. Its `Length` property reports the number of elements. Reading outside the valid range throws an exception.

A generic `List<T>` can grow and shrink. Import its namespace, then choose the element type between angle brackets:

```csharp
using System.Collections.Generic;

List<string> inventory = new List<string>();
inventory.Add("Health Potion");
inventory.Add("Key");
```

`inventory.Count` reports the current number of elements. `Remove` removes a matching value, `RemoveAt` removes the element at a position, and `Clear` removes everything.

## Visiting elements

A `foreach` loop reads every element without managing an index:

```csharp
foreach (string itemName in inventory)
{
    Debug.Log(itemName);
}
```

Use a `for` loop when the position matters or when replacing elements by index. Check that an index is at least zero and less than `Count` or `Length` before using input from gameplay.

Choose an array when the collection has a naturally fixed size or when a Unity API requires one. Choose `List<T>` when elements need to be added or removed at runtime. Both preserve order and allow indexed access.

Changing a list while a `foreach` loop is visiting it causes an exception. Instead, record changes for later or use a carefully controlled reverse `for` loop when removing by index.
