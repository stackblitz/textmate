import test, { ExecutionContext, Macro } from 'ava';
import { grammars, languages, isGrammarDefinition } from '..';

const isGrammarDefinitionMacro: Macro<[any, boolean]> = (t: ExecutionContext, definition: any, isGrammar: boolean) => {
	t.is(isGrammarDefinition(definition), isGrammar);
};

for (const grammarDefinition of grammars) {
	test(
		`${grammarDefinition.scopeName} should be a grammar definition`,
		isGrammarDefinitionMacro,
		grammarDefinition,
		true
	);
}

for (const languageDefinition of languages) {
	test(
		`${languageDefinition.language} should not be a grammar definition`,
		isGrammarDefinitionMacro,
		languageDefinition,
		false
	);
}

test('`undefined` should not be a grammar definition', isGrammarDefinitionMacro, undefined, false);
test('`null` should not be a grammar definition', isGrammarDefinitionMacro, null, false);
test('empty object should not be a grammar definition', isGrammarDefinitionMacro, {}, false);
test(
	'object with only `scopeName` should not be a grammar definition',
	isGrammarDefinitionMacro,
	{ scopeName: 'source.js' },
	false
);
test(
	'object with only `grammar` not be a grammar definition',
	isGrammarDefinitionMacro,
	{ grammar: 'JavaScript.tmLanguage.json' },
	false
);
