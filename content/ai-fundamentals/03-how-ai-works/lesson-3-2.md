## From networks to language

A basic **neural network** contains connected layers of small mathematical units. An input is represented as numbers, transformed through one or more hidden layers and turned into an output. During training, the strengths of connections—parameters called weights—are adjusted so that outputs become more useful. The word “neural” reflects loose historical inspiration from brains, but an artificial neural network is a mathematical computing system, not a small electronic brain.

Networks with many layers are used in deep learning. Different layers can develop representations of useful patterns. In an image task, early processing might respond to edges while later processing combines patterns relevant to shapes. These representations are learned through optimisation rather than supplied as a complete set of hand-written rules.

A **large language model (LLM)** is a neural network trained on large collections of text and other data. Text is divided into **tokens**. A token might be a word, part of a word or punctuation. During a central stage of training, the model learns to predict a token from the context around it.

When generating an answer, an LLM predicts a likely next token, selects one, adds it to the context and repeats. Additional training can make responses more helpful and safer, but the core generation process remains statistical prediction. The prompt and earlier generated tokens influence what comes next.

This process can produce remarkably fluent explanations, summaries and code. It also has limits. A plausible continuation is not necessarily a true statement. The model may fabricate a reference, repeat bias found in data, miss recent information or reason inconsistently. Outputs can vary between attempts. Treat generated content as a draft or aid whose important claims require checking, especially in medical, legal, financial or academic settings.
