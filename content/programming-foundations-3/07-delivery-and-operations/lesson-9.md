## Repeatable delivery

Continuous integration runs automated checks for every shared change. A pipeline may validate formatting and content, compile, run tests, scan dependencies and build one immutable artifact. Promote the same verified artifact through environments rather than rebuilding different output.

Deployment places a version into an environment. Release exposes behaviour to users. Feature flags and staged rollout can separate these steps, limiting impact and allowing evidence-based rollback. Flags themselves require ownership and removal.

Store environment-specific configuration outside the artifact and protect secrets through an appropriate secret store.

## Observability

Logs describe discrete events with useful context. Metrics aggregate numeric behaviour such as request rates, latency and failures. Traces connect work across components in one request. Together they help answer different operational questions.

Use correlation identifiers and structured fields. Never log credentials or unnecessary personal data. Retention and access are security decisions.

## Operating safely

Define service indicators that reflect user experience and alerts that require action. A dashboard full of technical measurements is not a substitute for an objective.

Prepare rollback and incident procedures before failure. During an incident, stabilise user impact, preserve evidence and communicate clearly. Afterwards, examine system and process contributors without blaming individuals. Turn learning into tracked improvements. Software is not finished at deployment; operability, upgrades and retirement are part of its lifecycle.
