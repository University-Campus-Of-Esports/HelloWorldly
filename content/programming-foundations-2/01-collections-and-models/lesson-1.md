## Choosing a collection

A collection stores multiple values under one name. A **sequence** retains an order and normally permits duplicates. It suits a playlist or a history of moves. A **set** represents unique membership, such as unlocked achievements. A **map** associates unique keys with values, such as product IDs with products.

Common operations include adding, removing, finding, counting and iterating. Choose a collection from the operations the program needs, not merely from habit. If order matters, a set alone is insufficient. If frequent lookup by a stable identifier matters, repeatedly scanning a long sequence may be a poor fit.

Positions require care. Many languages number the first element as zero. Code must also handle an empty collection or a requested position outside its valid range.

## Modelling meaningful data

A **data model** describes the information in a problem and the relationships or rules that make it valid. A task might have a title, completion state and due date:

```text
Task
    title: text, required
    isComplete: Boolean
    dueDate: optional date
```

Good models reflect the domain. A completion state is better represented by a Boolean than by arbitrary text such as “yes”, “done” or “finished”. An optional due date should explicitly permit no date rather than rely on an unexplained placeholder.

Separate identity from display position. An item may move within a list, so its index is not always a safe permanent identifier. A stable ID lets other data refer to the same item even when ordering changes.

Document constraints beside the model: titles cannot be empty, IDs must be unique and a score cannot be negative. Those constraints later guide validation and tests.
