#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/9f8c08023bb81456b044aef3300c2be66daec2b4a85edc7b1497610f21816a48/contract';
import endContract from '../../snapshots/9f8c08023bb81456b044aef3300c2be66daec2b4a85edc7b1497610f21816a48/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'productos',
        columns: [
          col('cantidad', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('descripcion', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('embedding', 'vector(768)', {
            codecRef: { codecId: 'pg/vector@1', typeParams: { length: 768 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nombre', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('precio', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
