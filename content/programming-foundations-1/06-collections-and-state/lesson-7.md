## Groups of related values

A **list** stores an ordered group of values. It can begin empty, accept new items, report its size and provide items by position. Lists usually allow duplicates. Many languages call a fixed-size sequence an array and provide a separate resizable list.

```text
scores = [8, 10, 7]
append 9 to scores
display scores[0]
```

Positions commonly start at zero. A valid position must be at least zero and less than the list size.

## Traversal and accumulation

Use a for-each loop when the item matters but its position does not:

```text
total = 0
for each score in scores
    total = total + score
```

`total` is an **accumulator**. It begins with an identity value and is updated for each item. Counting matches, finding a maximum and building filtered results follow similar patterns. Decide what should happen for an empty list; an average cannot divide by zero.

Use a position-based loop when neighbouring items or positions are genuinely required. Keep its boundary aligned with the collection size.

Changing a list while traversing it can shift positions or invalidate the traversal. Safer approaches include building a new filtered list, traversing backwards when removing by position, or using a collection operation provided for that purpose. Choose clarity before cleverness and test empty, single-item and multi-item cases.
