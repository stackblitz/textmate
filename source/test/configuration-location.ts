import test from 'ava';
import { languages, getLanguageConfigurationLocation } from '..';
import { fileExistsMacro } from './helpers/file-exists';

test('should throw if grammar property is invalid', (t) => {
	t.throws(
		() => getLanguageConfigurationLocation({ language: 'javascript', extensions: ['.js'], configuration: 1 } as any),
		{
			instanceOf: TypeError,
			message: 'Expected `definition.configuration` to be of type `object`, got `number`'
		}
	);

	t.throws(
		() =>
			getLanguageConfigurationLocation({
				language: 'javascript',
				extensions: ['.js'],
				configuration: { base: 1, file: 'JavaScript.tmLanguage.json' } as any
			}),
		{
			instanceOf: TypeError,
			message: 'Expected `definition.configuration.base` to be of type `string`, got `number`'
		}
	);

	t.throws(
		() =>
			getLanguageConfigurationLocation({
				language: 'javascript',
				extensions: ['.js'],
				configuration: { base: 'javascript', file: 1 } as any
			}),
		{
			instanceOf: TypeError,
			message: 'Expected `definition.configuration.file` to be of type `string`, got `number`'
		}
	);
});

test('should throw if definition is not a `GrammarDefinition` or `LanguageDefinition`', (t) => {
	t.throws(() => getLanguageConfigurationLocation({} as any), {
		instanceOf: TypeError,
		message: 'Expected `definition` to be `LanguageDefinition` or `GrammarDefinition`'
	});
});

test('should return default path if configuration is not defined', (t) => {
	t.is(
		getLanguageConfigurationLocation({
			language: 'javascriptreact',
			extensions: ['.jsx']
		}),
		'javascriptreact/language-configuration.json'
	);
});

test('should return location if configuration is an object', (t) => {
	t.is(
		getLanguageConfigurationLocation({
			language: 'jsx-tags',
			extensions: [],
			configuration: {
				base: 'javascript',
				file: 'tags-language-configuration.json'
			}
		}),
		'javascript/tags-language-configuration.json'
	);
});

test('should return location if configuration is a string', (t) => {
	t.is(
		getLanguageConfigurationLocation({
			language: 'jsx-tags',
			extensions: [],
			configuration: 'tags-language-configuration.json'
		}),
		'jsx-tags/tags-language-configuration.json'
	);
});

// Iterate over all languages and test that the configuration file exists
for (const language of languages) {
	test(
		`language configuration should exist for language ${language.language}`,
		fileExistsMacro,
		getLanguageConfigurationLocation(language)
	);
}
