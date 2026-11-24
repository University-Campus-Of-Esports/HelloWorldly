## Preserve behaviour

**Refactoring** changes the internal design of code without intentionally changing its observable behaviour. Examples include renaming a misleading variable, extracting a function, replacing duplicated logic or moving a responsibility to a more cohesive module.

Tests provide a safety net, but first confirm that they cover the behaviour being preserved. Make one small transformation, run the relevant checks and commit at a coherent point. Mixing refactoring with a feature change makes a failure harder to attribute.

## Investigate smells

A **code smell** is a prompt to investigate. Long functions, repeated code, many parameters, global state and classes that change for unrelated reasons can indicate unclear responsibilities. Context matters: two similar lines do not always represent the same rule, and prematurely unifying them can couple unrelated behaviour.

Extract code when the result has a meaningful name. Move knowledge to the module that owns it. Replace comments explaining confusing mechanics by clearer code, while retaining comments that explain purpose or a non-obvious trade-off.

## Keep design economical

Refactoring is not a contest to create the most layers. Every interface, type and helper has a learning cost. Prefer the simplest structure that makes current responsibilities and likely changes clear.

Use version control to compare before and after. A review should be able to see that tests remain green and the structural intention is focused. Stop when the code is clear enough for the next known task; endless polishing can delay useful delivery.
