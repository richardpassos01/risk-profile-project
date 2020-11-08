import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTableIfNotExists('risk_profile', (table) => {
      table
        .uuid('id')
        .primary();

      table
        .uuid('user_id')
        .references('user.id')
        .onDelete('CASCADE')
        .notNullable();

      table
        .string('auto', 25)
        .notNullable();

      table
        .string('disability', 25)
        .notNullable();

      table
        .string('home', 25)
        .notNullable();

      table
        .string('life', 25)
        .notNullable();

      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('risk_profile');
}
