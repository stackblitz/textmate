import test, { ExecutionContext, Macro } from 'ava';
import { languages, grammars, isLanguageDefinition } from '..';

const isLanguageDefinitionMacro: Macro<[any, boolean]> = (
	t: ExecutionContext,
	definition: any,
	isLanguage: boolean
) => {
	t.is(isLanguageDefinition(definition), isLanguage);
};

for (const languageDefinition of languages) {
	test(
		`${languageDefinition.language} should be a language definition`,
		isLanguageDefinitionMacro,
		languageDefinition,
		true
	);
}

for (const grammarDefinition of grammars) {
	test(
		`${grammarDefinition.scopeName} should not be a language definition`,
		isLanguageDefinitionMacro,
		grammarDefinition,
		false
	);
}

test('`undefined` should not be a language definition', isLanguageDefinitionMacro, undefined, false);
test('`null` should not be a language definition', isLanguageDefinitionMacro, null, false);
test('empty object should not be a language definition', isLanguageDefinitionMacro, {}, false);
test(
	'object with only `language` should not be a language definition',
	isLanguageDefinitionMacro,
	{ language: 'javascript' },
	false
);
test(
	'object with only `extensions` not be a language definition',
	isLanguageDefinitionMacro,
	{ extensions: ['.js'] },
	false
);
