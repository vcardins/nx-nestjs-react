import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, DynamicModule } from '@nestjs/common';
import { getMetadataArgsStorage, ConnectionOptions } from 'typeorm';

import * as ormConfig from './ormconfig';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export function getTypeOrmModule(entities: ConnectionOptions['entities'] ) {
	return TypeOrmModule.forRoot({
		...ormConfig,
		entities: [
			...entities,
			...getMetadataArgsStorage().tables.map((tbl) => tbl.target),
		],
	});
}

@Module({})
export class DatabaseModule {
	static forRoot(entities: ConnectionOptions['entities'] = []): DynamicModule {
		return {
			global: true,
			module: DatabaseModule,
			imports: [
				getTypeOrmModule(entities),
			],
		};
	}

	static forFeature(entities: EntityClassOrSchema[] = []): DynamicModule {
		const imports = [
			TypeOrmModule.forFeature(entities),
		];
		return {
			module: DatabaseModule,
			imports,
			exports: imports,
		};
	}
}
