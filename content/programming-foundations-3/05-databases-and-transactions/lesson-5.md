## Tables and keys

A relational database stores rows in tables with defined columns. A **primary key** uniquely identifies a row. A **foreign key** refers to a key in another table and represents a relationship.

For an order system, customers and orders belong in separate tables. Each order stores a customer key rather than copying the customer's full details. Constraints can require values, enforce uniqueness and reject references to missing rows.

Avoid using a display name as identity; names can change or collide. Use a stable key and treat presentation separately.

## Querying sets

A query describes the result required. Selection filters rows, projection chooses columns and a **join** combines related rows. Ask only for the columns and rows needed. An index can speed frequent lookup and ordering, but costs storage and update work, so add indexes from measured query needs.

Applications must use parameterised queries for untrusted values:

```text
query = "select title from tasks where owner_id = parameter"
execute query with ownerId as the parameter
```

Do not build SQL by joining user text into a command. Parameterisation preserves the boundary between code and data.

Database schemas are contracts. Change them through reviewed migrations that can be applied consistently. Consider existing rows when adding a required column and test migrations on representative data. Backups matter only when restoration has also been tested.
