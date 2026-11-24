## Text is a sequence

A text value is a sequence of characters. Programs commonly measure its length, select a character, search for a smaller piece, replace content or **split** it around a delimiter. Splitting `"red,green,blue"` around commas produces three values.

Positions are often zero-based, and selecting outside the available range is an error. Empty text is also different from missing data and from text containing only spaces.

## Normalisation and comparison

User input may contain surrounding spaces or different letter case. A command interface might trim spaces and convert input to one case before comparison:

```text
command = trim(input)
if lowerCase(command) == "quit"
    stop
```

Normalisation must match the domain. A password must not be silently lowercased. Human-language comparison can also depend on locale, so use language facilities designed for the intended audience rather than inventing character rules.

## Formatting output

Readable output combines labels and values:

```text
display "Score: " + score + " of " + maximum
```

Many languages offer interpolation or formatting placeholders, which are clearer when several values are involved. Format dates, currencies and decimal precision intentionally. Keep the original numeric value for calculations; formatting should normally happen only when presenting it.

Avoid constructing structured data by manually joining text when a proper serializer exists. Commas, quotes and line breaks inside a value can otherwise produce an invalid file. Text operations are simple tools, but their context determines whether the result remains unambiguous.
