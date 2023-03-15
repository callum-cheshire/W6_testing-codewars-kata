/**
 * Helper functions to interact with the "todos" table in the database.
 */

import { pool } from "../db/index.js";

export async function getAllTodos() {
  const sqlQuery =
    "SELECT id, task, completion_date FROM todos ORDER BY completion_date ASC, id ASC;";
  const result = await pool.query(sqlQuery);
  const todos = result.rows;
  return todos;
}

export async function createTodo(newTodo) {
  const sqlQuery =
    "INSERT INTO todos (task, completion_date) VALUES ($1, $2) RETURNING *;";
  const parameterValues = [newTodo.task, newTodo.completionDate];
  const result = await pool.query(sqlQuery, parameterValues);
  const created = result.rows[0];
  return created;
}

export async function deleteTodoById(todoId) {
  const sqlQuery = "DELETE FROM todos WHERE id = $1 RETURNING *;";
  const parameterValues = [todoId];
  const result = await pool.query(sqlQuery, parameterValues);
  const deleted = result.rows[0];
  return deleted;
}
