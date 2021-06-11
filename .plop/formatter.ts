import { glob } from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { getFileInfo, resolveConfig, format } from 'prettier';
import { green } from 'chalk';
import * as path from 'path';
export function findFiles(target: string) {
	return [...glob.sync(`${target}/**/**/*`, { nodir: true })];
}

export async function prettierFormatter(filePath: string) {
	const { inferredParser: parser } = await getFileInfo( filePath );
	const options = await resolveConfig( path.join( process.cwd() ) );
	const { data, ...optionsRest } = ( {
		...options,
		parser,
		data: readFileSync( filePath, 'utf-8' ),
	} );
	writeFileSync( filePath, format( data, optionsRest ), 'utf-8' );
	return green( `Formatted ${ filePath }` );
}
