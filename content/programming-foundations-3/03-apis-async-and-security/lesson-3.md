## Requests are uncertain

An application commonly calls an **API** by sending a request and interpreting a response. A contract defines the operation, required inputs, successful output and possible errors. Validate both outgoing assumptions and incoming data; a remote response is outside your program's control.

Network work has latency and partial failure. A request may time out after the server processed it, so retrying can accidentally repeat an action. Operations that can safely be repeated are called **idempotent**. Other operations may require a unique request identifier or a status check before retrying.

## Asynchronous work

Asynchronous programming lets a program make progress while it waits for input, a file or a network response. It does not make the external operation instantaneous.

Every asynchronous operation needs a success path, an error path and often cancellation or a timeout. Shared state can change before an operation completes, so code must check that a late result is still relevant. Avoid blocking a user-interface thread while waiting.

## Security basics

Treat all external input as untrusted. Validate permitted shape, length and range. Use safe library operations or parameterised database queries rather than building commands from untrusted text.

Apply **least privilege**: give users, processes and tokens only the capabilities they need. Store passwords using a purpose-built password-hashing function, not reversible encryption or plain text. Keep API keys and other secrets out of source control, logs and client code where users can inspect them.

Security is a continuing risk-management process. Update dependencies, record important actions without recording secrets, and design error messages that help legitimate users without exposing internal details.
