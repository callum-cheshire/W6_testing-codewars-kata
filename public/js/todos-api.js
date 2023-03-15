// This file contains helper functions for interacting with the todos REST API.

/**
 * Defining the endpoint in one place so that if it needs to be changed,
 * it only needs to be changed here.
 *
 * A relative url (as opposed to an absolute url) is used. The assumption
 * is that the same backend/origin is handling the REST API and
 * serving the frontend.
 */
const todosApiEndpoint = "/api/todos";

/**
 * Should get all todos via GET /api/todos endpoint.
 *
 * @example
 * ```
 * // Should contain an array of todo objects.
 * const todos = await getAllTodos();
 * ```
 */
export async function getAllTodos() {
  const response = await fetch(todosApiEndpoint);

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  const data = await response.json();
  return data.payload;
}

/**
 * Should create a new todo via POST /api/todos endpoint.
 *
 * @example
 * ```
 * const task = "Water the plants";
 * const completionDate = "2025-03-01";
 * // Should contain the newly created todo object (or null if creation failed).
 * const created = await createTodo({ task: task, completionDate: completionDate });
 * ```
 */
export async function createTodo(newTodo) {
  const requestBody = JSON.stringify({
    task: newTodo.task,
    completionDate: newTodo.completionDate,
  });

  const response = await fetch(todosApiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: requestBody,
  });

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  const data = await response.json();
  return data.payload;
}

/**
 * Should delete a todo via DELETE /api/todos endpoint.
 *
 * @example
 * ```
 * const idToDelete = 56;
 * // Should contain the deleted todo object (or null if deletion failed)
 * const deleted = await deleteTodo(idToDelete);
 * ```
 */
export async function deleteTodo(todoId) {
  const url = `${todosApiEndpoint}/${todoId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log(await response.text());
    return null;
  }

  const data = await response.json();
  return data.payload;
}
