import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTableIfNotExists('user', (table) => {
      table
        .uuid('id')
        .primary();

      table
        .integer('year_of_birthday')
        .notNullable();

      table
        .integer('dependents')
        .notNullable();

      table
        .json('house')
        .defaultTo(null);

      table
        .integer('income')
        .defaultTo(0)
        .notNullable();

      table
        .string('marital_status')
        .notNullable();

      table
        .json('risk_questions')
        .notNullable();

      table
        .json('vehicle')
        .defaultTo(null);

      table
        .boolean('is_deleted')
        .defaultTo(false);

      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user');
}
