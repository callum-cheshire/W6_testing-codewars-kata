import * as todosApi from "./todos-api.js";

/**
 * A function that can be called which fetches all todos (via the REST API)
 * and displays them on the page (in the todos list).
 *
 * Calling this function is somewhat expensive, as it refetches
 * and recreates all elements.
 *
 * However, it also gives us a simple way to ensure the page reflects
 * the latest todos (from the REST API).
 */
export async function fetchAndRerender() {
  const todos = await todosApi.getAllTodos();

  const summary = document.querySelector("#summary");
  const ul = document.querySelector("#todos");

  ul.innerHTML = "";
  summary.innerHTML = "";

  if (0 === todos.length) {
    summary.textContent =
      "😌 No todos found. Looks like you're up-to-date on everything...";
    return;
  }

  const view = createElementForTodos(todos);
  ul.append(view);
}

/**
 * Should take in an array of todo objects and should return a fragment
 * containing DOM elements representing each todo object.
 *
 * @example
 * ```
 * const todos = [
 *    { id: 0, task: "Water the plants", completion_date: "2023-05-06" },
 *    { id: 1, task: "Feed the dog", completion_date: "2022-01-01" },
 * ];
 * const fragment = createElementForTodos(todos)
 * ```
 *
 * Note that this function only creates the element. It doesn't add it to the page.
 */
function createElementForTodos(todos) {
  const fragment = document.createDocumentFragment();

  for (const todoItem of todos) {
    const element = createElementForTodoItem(todoItem);
    fragment.append(element);
  }

  return fragment;
}

/**
 * Should take in a todo object and return a DOM element representing the todo object.
 *
 * @example
 * ```
 * const todo = { id: 0, task: "Drink water", completion_date: "2023-03-06" };
 * const element = createElementForTodoItem(todo);
 * ```
 *
 * Note that this function only creates the element. It doesn't add it to the page.
 */
function createElementForTodoItem(todoItem) {
  const li = document.createElement("li");
  const task = createElementForTask(todoItem.task);
  const completionDate = createElementForCompletionDate(
    todoItem.completion_date
  );
  const deleteButton = createDeleteButtonForTodoItem(todoItem.id);

  li.append(task, completionDate, deleteButton);
  return li;
}

/**
 * Should take in a string representing a task and return a DOM element representing the task.
 *
 * @example
 * ```
 * const task = "Drink some water";
 * const element = createElementForTask(task);
 * ```
 *
 * Note that this function only creates the element. It doesn't add it to the page.
 */
function createElementForTask(task) {
  const element = document.createElement("span");
  element.textContent = task;
  return element;
}

/**
 * Should take in a string representing a completetion date and return a DOM element representing the date.
 *
 * @example
 * ```
 * const completionDate = "2042-05-03";
 * const element = createElementForCompletionDate(completionDate);
 * ```
 *
 * Note that this function only creates the element. It doesn't add it to the page.
 */
function createElementForCompletionDate(completionDate) {
  const element = document.createElement("time");
  const yyyymmdd = completionDate.split("T")[0];
  element.dateTime = yyyymmdd;
  element.textContent = yyyymmdd;
  return element;
}

/**
 * Should take in a number representing a todo object's id and return a DOM element
 * which has a click listener attached.
 *
 * @example
 * ```
 * const todoId = 2;
 * const button = createDeleteButtonForTodoItem(todoId);
 * ```
 *
 * Note that this function only creates the element. It doesn't add it to the page.
 */
function createDeleteButtonForTodoItem(todoId) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "🗑️";
  deleteButton.title = "Delete this todo";

  async function handleClick() {
    const deleted = await todosApi.deleteTodo(todoId);

    if (null === deleted) {
      return alert("Failed to delete, please try again later");
    }

    await fetchAndRerender();
  }

  deleteButton.addEventListener("click", handleClick);

  return deleteButton;
}
