import test from 'ava';
import ow from 'ow';
import { languages } from '..';

test('languages should have the correct shape', (t) => {
	t.true(languages.length > 0);

	t.notThrows(() => {
		ow(
			languages,
			'languages',
			ow.array.ofType(
				ow.object.exactShape({
					language: ow.string.nonEmpty,
					scopeName: ow.optional.string.nonEmpty,
					extensions: ow.array.ofType(ow.string.nonEmpty.startsWith('.')),
					aliases: ow.optional.array.ofType(ow.string.nonEmpty),
					filenames: ow.optional.array.ofType(ow.string.nonEmpty),
					grammar: ow.optional.any(
						ow.string.nonEmpty,
						ow.object.exactShape({
							base: ow.string.nonEmpty,
							file: ow.string.nonEmpty
						})
					),
					configuration: ow.optional.any(
						ow.string.nonEmpty,
						ow.object.exactShape({
							base: ow.string.nonEmpty,
							file: ow.string.nonEmpty
						})
					),
					embeddedLanguages: ow.optional.object.valuesOfType(ow.string.nonEmpty),
					tokenTypes: ow.optional.object.valuesOfType(ow.string.nonEmpty),
					firstLine: ow.optional.string.nonEmpty,
					mimetypes: ow.optional.array.ofType(ow.string.nonEmpty)
				})
			)
		);
	});
});
