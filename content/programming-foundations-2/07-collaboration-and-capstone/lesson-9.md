## Reviewable work

A short-lived branch isolates one coherent change. Keep it current with the shared branch, commit understandable increments and run checks before requesting review. A review description should explain the problem, the chosen approach, how it was tested and any important trade-offs.

Review the behaviour and design, not the author. Comments should be specific and actionable. Distinguish required corrections from optional suggestions. The author should respond with reasoning, not merely apply changes without understanding them.

## Integrating changes

A merge combines histories. A **merge conflict** occurs when Git cannot determine how overlapping changes should combine. Read both intentions and construct the correct final code; choosing one side blindly may discard valid work. Run tests after resolving a conflict.

Avoid formatting an entire project inside an unrelated feature, because mechanical noise hides meaningful changes. Agree on automated formatting and conventions so reviews can focus on behaviour.

## Shared responsibility

The team owns merged code. Protect the main branch with automated checks and review proportionate to risk. Small changes reduce review time and make rollback safer.

Communicate changes that affect contracts, data formats or setup. Update documentation in the same change rather than leaving it knowingly inaccurate. Collaboration is not an extra layer after programming: it is a technical practice for maintaining a shared, understandable system.
