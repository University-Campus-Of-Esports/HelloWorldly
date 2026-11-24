## Separate learning from evaluation

Training data adjusts a model. Validation data supports choices such as model settings and decision thresholds. A held-out **test set** provides a final estimate on examples not used during fitting or tuning. Repeatedly changing a system after inspecting test results gradually turns the test set into tuning data.

Examples must represent the intended context. A speech system tested only in quiet rooms says little about a noisy workplace. Real inputs can also change over time, causing **distribution shift**.

## Choose meaningful metrics

Accuracy is the fraction of all predictions that are correct. It can mislead when one class is rare. A fraud detector that predicts “not fraud” for every transaction may be highly accurate while detecting no fraud.

**Precision** asks how many positive predictions were correct. **Recall** asks how many actual positive cases were found. Raising one can lower the other, so choose a threshold from the consequences of false positives and false negatives.

Generative systems need task-specific evaluation. Factual accuracy, relevance, safety, citation support, latency and cost may all matter. Human evaluation needs a clear rubric and more than one representative example.

## Look beyond an average

Break results down by relevant subgroups and input conditions. Investigate both systematic and rare high-impact failures. Record model, prompt, data and evaluation versions so results can be reproduced.

Evaluation continues after release. Monitor real outcomes and user feedback without collecting unnecessary personal data. A metric is evidence, not a complete ethical judgement; people must decide which errors are acceptable for the context.
