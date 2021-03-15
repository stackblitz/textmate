# @blitz/textmate

[![CI](https://github.com/stackblitz/textmate/workflows/CI/badge.svg)](https://github.com/stackblitz/textmate/actions/workflows/main.yaml)

> TextMate Grammars for StackBlitz


## Install

```
$ npm install @blitz/textmate
```


## API

### languages

List of TextMate grammar `LanguageDefinition`s.

### grammars

List of TextMate grammar `GrammarDefinition`s.

### getGrammarLocation(definition)

Retrieve the location of the grammar file for the provided definition.

#### definition

Type: `object`

Definition to retrieve the grammar location for.

### getLanguageConfigurationLocation(definition)

Retrieve the location of the language configuration file for the provided language definition.

#### definition

Type: `object`

Language definition to retrieve the language configuration location for.

### isGrammarDefinition(definition)

Check if the provided definition is a `GrammarDefinition`.

#### definition

Type: `object`

The definition to check for.

### isLanguageDefinition(definition)

Check if the provided definition is a `LanguageDefinition`.

#### definition

Type: `object`

The definition to check for.
