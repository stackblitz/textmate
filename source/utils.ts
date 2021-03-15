import * as path from 'path';
import { DefinitionLocation, GrammarDefinition, LanguageDefinition } from './entities';
import { isGrammarDefinition, isLanguageDefinition } from './type-guards';

function verifyDefinitionLocation(key: string, value: any): asserts value is DefinitionLocation {
	const type = typeof value;

	if (type !== 'object') {
		throw new TypeError(`Expected \`definition.${key}\` to be of type \`object\`, got \`${type}\``);
	}

	if (typeof value.base !== 'string') {
		throw new TypeError(`Expected \`definition.${key}.base\` to be of type \`string\`, got \`${typeof value.base}\``);
	}

	if (typeof value.file !== 'string') {
		throw new TypeError(`Expected \`definition.${key}.file\` to be of type \`string\`, got \`${typeof value.file}\``);
	}
}

/**
 * Retrieve the location of the grammar file for the provided definition.
 *
 * @param definition - definition to retrieve the grammar location for.
 * @returns location of the grammar file.
 */
export const getGrammarLocation = (definition: GrammarDefinition | LanguageDefinition): string | undefined | never => {
	if (!isGrammarDefinition(definition) && !isLanguageDefinition(definition)) {
		throw new TypeError('Expected `definition` to be `LanguageDefinition` or `GrammarDefinition`');
	}

	if (!definition.grammar) {
		// Some definitions might not have a `grammar` property in case they are only used for language configuration purposes like `jsx-tags`.
		return;
	}

	if (isLanguageDefinition(definition) && typeof definition.grammar === 'string') {
		// The grammar will only be a `string` in case of a language definition.
		return path.join(definition.language, 'syntaxes', definition.grammar);
	}

	// If the `grammar` is not a `string`, it has to be an object.
	verifyDefinitionLocation('grammar', definition.grammar);

	return path.join(definition.grammar.base, 'syntaxes', definition.grammar.file);
};

/**
 * Retrieve the location of the language configuration file for the provided language definition.
 *
 * @param definition - language definition to retrieve the language configuration location for.
 * @returns location of the language configuration file.
 */
export const getLanguageConfigurationLocation = (definition: LanguageDefinition): string | never => {
	if (!isGrammarDefinition(definition) && !isLanguageDefinition(definition)) {
		throw new TypeError('Expected `definition` to be `LanguageDefinition` or `GrammarDefinition`');
	}

	// If the base is not set for the configuration file, use the base from the grammar or the language identifier
	const base = typeof definition.grammar === 'object' ? definition.grammar.base : definition.language;

	if (!definition.configuration) {
		// The default configuration name is `language-configuration.json`.
		return path.join(base, 'language-configuration.json');
	}

	if (typeof definition.configuration === 'string') {
		// If the configuration name is of type `string`, concatenate with the `language`.
		return path.join(base || definition.language, definition.configuration);
	}

	// If the `configuration` is defined and not a `string`, it has to be a definition location object.
	verifyDefinitionLocation('configuration', definition.configuration);

	return path.join(definition.configuration.base, definition.configuration.file);
};
