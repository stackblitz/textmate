import test from 'ava';
import { languages, grammars, getGrammarLocation } from '..';
import { fileExistsMacro } from './helpers/file-exists';

test('should throw if grammar property is invalid', (t) => {
	t.throws(() => getGrammarLocation({ language: 'javascript', extensions: ['.js'], grammar: 1 } as any), {
		instanceOf: TypeError,
		message: 'Expected `definition.grammar` to be of type `object`, got `number`'
	});

	t.throws(
		() =>
			getGrammarLocation({
				language: 'javascript',
				extensions: ['.js'],
				grammar: { base: 1, file: 'JavaScript.tmLanguage.json' } as any
			}),
		{
			instanceOf: TypeError,
			message: 'Expected `definition.grammar.base` to be of type `string`, got `number`'
		}
	);

	t.throws(
		() =>
			getGrammarLocation({
				language: 'javascript',
				extensions: ['.js'],
				grammar: { base: 'javascript', file: 1 } as any
			}),
		{
			instanceOf: TypeError,
			message: 'Expected `definition.grammar.file` to be of type `string`, got `number`'
		}
	);
});

test('should throw if definition is not a `GrammarDefinition` or `LanguageDefinition`', (t) => {
	t.throws(() => getGrammarLocation({} as any), {
		instanceOf: TypeError,
		message: 'Expected `definition` to be `LanguageDefinition` or `GrammarDefinition`'
	});
});

test('should throw if definition is a `GrammarDefinition` with string `grammar`', (t) => {
	t.throws(
		() =>
			getGrammarLocation({
				scopeName: 'source.js.regexp',
				grammar: 'jsregexp.tmLanguage'
			} as any),
		{
			instanceOf: TypeError,
			message: 'Expected `definition` to be `LanguageDefinition` or `GrammarDefinition`'
		}
	);
});

test('should return `undefined` if grammar is not defined', (t) => {
	t.is(
		getGrammarLocation({
			language: 'javascriptreact',
			extensions: ['.jsx']
		}),
		undefined
	);
});

test('should return grammar location if definition is a `GrammarDefinition`', (t) => {
	t.is(
		getGrammarLocation({
			scopeName: 'source.js.regexp',
			grammar: {
				base: 'javascript',
				file: 'jsregexp.tmLanguage'
			}
		}),
		'javascript/syntaxes/jsregexp.tmLanguage'
	);
});

test('should return grammar location if definition is a `LanguageDefinition` with object `grammar`', (t) => {
	t.is(
		getGrammarLocation({
			language: 'sass',
			scopeName: 'source.sass',
			extensions: ['.sass'],
			grammar: {
				base: 'scss',
				file: 'sass.tmLanguage.json'
			}
		}),
		'scss/syntaxes/sass.tmLanguage.json'
	);
});

test('should return grammar location if definition is a `LanguageDefinition` with string `grammar`', (t) => {
	t.is(
		getGrammarLocation({
			language: 'scss',
			scopeName: 'source.css.scss',
			extensions: ['.scss'],
			grammar: 'scss.tmLanguage.json'
		}),
		'scss/syntaxes/scss.tmLanguage.json'
	);
});

// Iterate over all languages and grammars and test that the grammar file exists
for (const language of languages) {
	test(`grammar should exist for language ${language.language}`, fileExistsMacro, getGrammarLocation(language));
}

for (const grammar of grammars) {
	test(`grammar should exist for scope ${grammar.scopeName}`, fileExistsMacro, getGrammarLocation(grammar));
}
