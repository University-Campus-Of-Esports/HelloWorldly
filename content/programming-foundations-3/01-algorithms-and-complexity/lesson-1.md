## Growth matters

Algorithm analysis asks how time or memory grows with input size. Looking up a known key in a suitable map is often approximately **constant** work. Scanning every item is **linear** work. Comparing every item with every other item is often **quadratic** work.

These categories describe growth rather than an exact duration. A simple linear algorithm may beat a complicated alternative for tiny inputs. For large inputs, growth usually dominates small constant differences.

First establish correctness. State the preconditions and the result the algorithm promises. Then measure representative data before optimising.

## Search as an example

A linear search examines items until it finds a match or reaches the end. It works with unsorted data. **Binary search** inspects the middle of ordered data and discards half of the remaining range after each comparison. It performs far fewer comparisons on large collections, but only when the ordering requirement is maintained.

Choosing an algorithm therefore includes the cost of preparing and maintaining its data.

## Recursion

A recursive function solves a problem by calling itself with a smaller instance. It needs:

- A base case that returns without another recursive call
- A progress step that moves every call towards that base case

```text
function countDown(n)
    if n <= 0
        return
    display n
    countDown(n - 1)
```

Recursion naturally represents trees and divide-and-conquer algorithms, but iteration may be clearer for a simple sequence. Recursive calls also consume call-stack space. Choose the form that makes correctness and resource use easiest to reason about.
