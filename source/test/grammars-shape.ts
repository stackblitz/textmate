import test from 'ava';
import ow from 'ow';
import { grammars } from '..';

test('grammars should have the correct shape', (t) => {
	t.true(grammars.length > 0);

	t.notThrows(() => {
		ow(
			grammars,
			'grammars',
			ow.array.ofType(
				ow.object.exactShape({
					scopeName: ow.string.nonEmpty,
					grammar: ow.any(
						ow.string.nonEmpty,
						ow.object.exactShape({
							base: ow.string.nonEmpty,
							file: ow.string.nonEmpty
						})
					),
					embeddedLanguages: ow.optional.object.valuesOfType(ow.string.nonEmpty),
					tokenTypes: ow.optional.object.valuesOfType(ow.string.nonEmpty),
					injectTo: ow.optional.array.ofType(ow.string.nonEmpty)
				})
			)
		);
	});
});
