import { DefinitionLocation } from './definition-location';
import { TokenTypeMap } from './tokens';

/**
 * A grammar definition is a definition of textmate grammar for something that is
 * not specifically tight to a language but is included by one or more other grammar files.
 */
export interface GrammarDefinition {
	/**
	 * Scope name of the language. Can be found in the textmate grammar files.
	 */
	scopeName: string;
	/**
	 * The location of the grammar file.
	 */
	grammar: DefinitionLocation;
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
	 * Defines in which scopes this grammar has to be injected into.
	 */
	injectTo?: string[];
}
