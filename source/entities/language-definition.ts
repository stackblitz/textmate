import { DefinitionLocation } from './definition-location';
import { TokenTypeMap } from './tokens';

export interface LanguageDefinition {
	/**
	 * The monaco language this definition belongs to.
	 */
	language: string;
	/**
	 * Scope name of the language. Can be found in the textmate grammar files.
	 */
	scopeName?: string;
	/**
	 * List of extensions where it should use this language for.
	 */
	extensions: string[];
	/**
	 * Aliases of the language.
	 */
	aliases?: string[];
	/**
	 * List of files where it should use the language for.
	 */
	filenames?: string[];
	/**
	 * The name of the grammar file to load. If it's a string, the `base` will be the `language` of the
	 * language definition.
	 */
	grammar?: string | DefinitionLocation;
	/**
	 * The name or location of the language configuration file. If not provided, the `base` will be the
	 * base of the `grammar` and the file will be `language-configuration.json`.
	 */
	configuration?: string | DefinitionLocation;
	/**
	 * This allows you to specify which language configuration should be used for which part in the
	 * file. For instance, in Vue you can have a style tag, if we press Cmd + / we want that to comment
	 * out that line depending on the language. This allows that.
	 */
	embeddedLanguages?: Record<string, string>;
	/**
	 * The token type map for the grammar.
	 */
	tokenTypes?: TokenTypeMap;
	/**
	 * The first line of the file can be used to infer the language. If it matches this regular expression, the
	 * language is inferred correctly.
	 */
	firstLine?: string;
	/**
	 * The mimetypes that could be used to infer the language.
	 */
	mimetypes?: string[];
}
