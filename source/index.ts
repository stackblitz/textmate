import type { GrammarDefinition, LanguageDefinition } from './entities';

export type { TokenType, TokenTypeMap, DefinitionLocation, GrammarDefinition, LanguageDefinition } from './entities';

export { isGrammarDefinition, isLanguageDefinition } from './type-guards';
export { getGrammarLocation, getLanguageConfigurationLocation } from './utils';

// Use `require` instead of `import` because we don't want the `grammars.json` file to be resolved at compile time
const data = require('../grammars/grammars.json');

export const languages: LanguageDefinition[] = data.languages;
export const grammars: GrammarDefinition[] = data.grammars;
