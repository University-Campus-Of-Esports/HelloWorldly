## Grounding with information

A language model generates likely text from its context; it is not automatically connected to current organisational knowledge. A retrieval system searches an approved collection and supplies relevant passages with the request. The model can then answer using that context and cite it.

Retrieval can still return irrelevant, outdated or hostile material. The model may also misread a good source. Evaluate retrieval quality and answer support separately, and let users inspect the evidence.

## Models using tools

An AI application may call a calculator, database, search service or action API. Tool results can improve accuracy and let a system act, but permissions increase risk. Apply least privilege, validate every argument and distinguish read-only tools from actions that change state.

Require confirmation for consequential or irreversible actions. Treat web pages, documents and tool output as untrusted data rather than instructions that override system policy. Keep an audit trail without storing unnecessary sensitive content.

## Human oversight

Place review according to impact and uncertainty. A low-risk suggestion may be checked after generation. A medical, financial, employment or safety decision requires qualified oversight and often should not be delegated to a general model at all.

Give reviewers the original request, relevant sources, model output and known limitations. Avoid automation bias: a human click is not meaningful oversight if the reviewer lacks time, authority or evidence to challenge the result.

A complete AI system includes data, retrieval, prompts, tools, interfaces, monitoring and people. Evaluate the whole workflow, not only the model in isolation.
