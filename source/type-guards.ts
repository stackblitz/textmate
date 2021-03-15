import { GrammarDefinition, LanguageDefinition } from './entities';

/**
 * Check if the provided definition is a `GrammarDefinition`.
 *
 * @param definition - definition to check for.
 */
export const isGrammarDefinition = (definition: any): definition is GrammarDefinition => {
	// A grammar definition doesn't have a language and extensions property, but has a `scopeName` and `grammar` property.
	return Boolean(
		definition?.scopeName &&
			definition?.grammar?.base &&
			definition?.grammar?.file &&
			!definition?.language &&
			!definition?.extensions
	);
};

/**
 * Check if the provided definition is a `LanguageDefinition`.
 *
 * @param definition - definition to check for.
 */
export const isLanguageDefinition = (definition: any): definition is LanguageDefinition => {
	// A language definition has a language and extensions property.
	return Boolean(definition?.language && definition?.extensions);
};
