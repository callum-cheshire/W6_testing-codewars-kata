// This file contains any logic that needs to run once when the page loads.

import { createTodo } from "./todos-api.js";
import { fetchAndRerender } from "./view.js";

const form = document.querySelector("form");

/**
 * Should handle the submit event when a user creates a new todo (on the frontend)
 * by extracting the information the user has entered
 * and giving it to `createTodo` (which internally uses the REST API to create a new todo).
 */
async function handleSubmit(event) {
  event.preventDefault();
  // For details, see: https://developer.mozilla.org/en-US/docs/Web/API/FormData
  const data = new FormData(form);
  const task = data.get("task");
  const completionDate = data.get("completionDate");

  const created = await createTodo({
    task: task,
    completionDate: completionDate,
  });

  if (null === created) {
    return alert("Failed to create todo, please try again later");
  }

  form.reset();
  await fetchAndRerender();
}

form.addEventListener("submit", handleSubmit);

// top level await is possible here as the script tag has type="module".
await fetchAndRerender();
