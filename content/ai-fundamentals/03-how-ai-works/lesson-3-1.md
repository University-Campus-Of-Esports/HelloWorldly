## Learning from examples

**Training data** is the collection of examples used to develop a machine-learning model. Each example contains useful information called features. In **supervised learning**, it also has a desired answer called a label. To train an email classifier, messages could be labelled “spam” or “not spam”. The learning algorithm adjusts the model so that patterns in the features help predict those labels.

A **model** is the fitted mathematical structure produced by training. It does not normally store a neat list of rules that a person can read. Instead, it contains numerical parameters whose combined values represent patterns. Training is an iterative process: the model makes predictions on examples, a calculation measures error, and the parameters are adjusted to reduce that error.

After training, developers evaluate the model using suitable examples that were not used to fit it. This helps reveal whether the model can handle new inputs rather than merely matching its training examples. Data must also represent the situations in which the model will operate. A plant-identification model trained only on bright, close-up photographs may struggle with plants photographed at night.

Using the trained model is called **inference**. When a new message arrives, the model processes its features and outputs a score or predicted label. Training can require considerable time and computing power, while each inference may be relatively quick.

Data quality matters as much as quantity. Incorrect labels, missing groups, old records or measurements that indirectly reveal protected characteristics can create unreliable or unfair behaviour. Human choices determine what is collected, how it is labelled, what outcome is optimised and what counts as acceptable performance. Machine learning automates pattern fitting, not responsibility for those choices.
