/* eslint-disable ava/use-test */
import * as fs from 'fs';
import * as path from 'path';
import { ExecutionContext, Macro } from 'ava';

export const fileExistsMacro: Macro<[string | undefined]> = (t: ExecutionContext, filePath: string | undefined) => {
	if (!filePath) {
		t.pass();

		return;
	}

	t.true(fs.existsSync(path.join(__dirname, '../../../grammars', filePath)));
};
