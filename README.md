<div align="center">
    <img alt="School of Code" src="./images/soc-logo.png" width="60" />
</div>
<h1 align="center">
  Test-athon 🧪
</h1>

We've delved into testing over the past few days, so it's time to keep practicing.

Tips for more testable code:

- For unit tests, you'll want your functions to do one thing. These functions should ideally be: small, predictable (i.e. for the same input/arguments, they return the same output), without side effects (i.e. they don't change or interact with something outside of themselves).
- For integration tests, what you're testing can be more complicated, as individual software units are combined and tested as a group, such as testing API routes.
- For more best practices when writing testable code, read [this article](https://blog.logrocket.com/javascript-testing-best-practices/).
- The guide in this [Github repo](https://github.com/goldbergyoni/javascript-testing-best-practices) contains testing wisdom and good practices! Have a look at the first few examples in the beginning sections to reinforce what we learned in class (and feel free to peruse the rest if you'd like).

## End-to-end testing

Take some time to familiarise yourself with how the app works. For this part, it's important that you run the app in the browser and understand/experience it from a user's perspective (as opposed to only looking at the code).

Write an end-to-end test using Cypress which checks the journey/workflow below:

> A user visits the site, adds a new todo to the list, deletes a todo from the list, refreshes the page and the todos are still persisted/saved.

For each step, think about how you can simulate any user interactions and which assertions would be useful to make and would give confidence.

Feel free to change the existing HTML or the JS to make it easier for you to get/select elements from your tests.

## API integration testing

Although the above end-to-end testing already covers this, writing integration tests that are focused on the backend and database can help us narrow down whether any failing tests are due to the backend.

Write API tests (with Jest and Supertest) which cover the endpoints/scenarios below:

| Request                   | Request body                 | Response status | Response body                                         |
| ------------------------- | ---------------------------- | --------------- | ----------------------------------------------------- |
| GET /api/todos            | none                         | 200             | { success: true, payload: an array of todo objects}   |
| POST /api/todos           | { task, completionDate }     | 201             | { success: true, payload: newly created todo object } |
| POST /api/todos           | Missing/invalid request body | 400             | { success: false, error: any string }                 |
| DELETE /api/todos/some_id | none                         | 200             | { success: true, payload: deleted todo object}        |

- To ensure each test has a fresh todos table, have a look at using the `beforeEach` hook (from Jest) and the `resetAllTables` function in `db/scripts/helpers.js` to programmatically reset the table before each test. This ensures one test's side effects (changes to the table) can't affect another test.

- To ensure Jest doesn't hang after the tests have been run, have a look at using the `afterAll` hook (from Jest) and the documentation for the `end` method of the pool to programmatically close the connection(s) to the database.

## Refactor and extend

Now that you've got some tests in place to cover existing functionality, feel free to refactor the code or iteratively add new features (e.g. styling, ability to update todos, more information for each todo, having a todo list per user instead of just one todo list, etc.).

If you refactor (maybe you've spotted something that can be simplified or made more readable), you can then rerun your tests after refactoring to check that nothing has unexpectedly broken or changed.

For each feature that you add, make sure you plan it out (as always) and add more tests to verify it's working correctly.

## Resources

If needed, check out the resources below:

### 📖 Blogs and articles

- [FreeCodeCamp: How to start unit testing your code](https://www.freecodecamp.org/news/how-to-start-unit-testing-javascript/)
- [Blog: An introduction to testing in JavaScript](https://gabrieltanner.org/blog/testing-introduction)
- [Academind: JavaScript testing introduction](https://academind.com/tutorials/javascript-testing-introduction/)

### 📺 Videos

**Fundamentals of testing in JavaScript:**

- [Part 1](https://drive.google.com/file/d/15fymUHLZZPBeI92WmWq-YTdaNtwSHYMA/view?usp=sharing)
- [Part 2](https://drive.google.com/file/d/15hFmrPDNrqBBgA6bpg4FT0w9zGP0n0IB/view?usp=sharing)
- [Part 3](https://drive.google.com/file/d/15ou12hLjEySNichRgFxGbHvdjoctzDFi/view?usp=sharing)
- [Part 4](https://drive.google.com/file/d/15rQPUQaByT4P5A_e6MULlRLJFhAwq4g2/view?usp=sharing)
- [Part 5](https://drive.google.com/file/d/15ugeFHuLRcgHenZHQr-38daOwfhq2N-G/view?usp=sharing)
- [Part 6](https://drive.google.com/file/d/162IbFNnOfsJ1mNuHzzbo-6lFdnDK18zx/view?usp=sharing)

**Testing APIs with Supertest**

- [Supertest tutorial](https://www.youtube.com/watch?v=T2sYitv2OAY)
- [Using async/await with Supertest](https://www.youtube.com/watch?v=hWGu7qJkoaA)
