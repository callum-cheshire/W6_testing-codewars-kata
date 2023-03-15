import { pool } from "../index.js";

export async function createAllTables() {
  // If you're unsure about CREATE TABLE IF NOT EXISTS, see: https://www.postgresql.org/docs/current/sql-createtable.html
  // If you're unsure about NOT NULL, see: https://www.postgresql.org/docs/current/ddl-constraints.html#id-1.5.4.6.6
  return await pool.query(
    `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      task VARCHAR(200) NOT NULL,
      completion_date TIMESTAMPTZ NOT NULL
    );
    
    INSERT INTO todos
      (task, completion_date)
    VALUES
      ('Walk the dog', '1999-01-08'),
      ('Feed the computer', '2015-01-10')
    ;`
  );
}

export async function dropAllTables() {
  // If you're unsure about DROP TABLE, see: https://www.postgresql.org/docs/current/sql-droptable.html
  return await pool.query("DROP TABLE IF EXISTS todos;");
}

export async function resetAllTables() {
  const dropped = await dropAllTables();
  const created = await createAllTables();
  return [dropped, created];
}
