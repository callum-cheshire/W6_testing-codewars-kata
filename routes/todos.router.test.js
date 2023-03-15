// Write your tests for task 2 in this file. Plan out what you need to import/require.

// install supertest (if not already in package.json)
// import supertest into our test file
import supertest from "supertest";
// import the Express app
import app from "../app.js";

import { pool } from "../db/index.js"
// import what we need from jest (expect, test)
import {expect, test, afterAll } from "@jest/globals";
// Run the server (taken care of for us by Supertest)

afterAll(async function () {
    await pool.end();
})

// GET 
test("GET /api/todos", async function () {
    const response = await supertest(app).get("/api/todos");
    expect (response.status).toBe(200);
    expect(response.body).toStrictEqual({
        success: true,
        payload: expect.any(Array),
    })

    const taskObjects = response.body.payload;

    for (let i = 0; i < taskObjects.length; i++) {
        const task = taskObjects[i];

        expect(task).toStrictEqual({
            id: expect.any(Number),
            task: expect.any(String),
            completion_date: expect.any(String)
        })
    }
});

// POST
test("POST /api/todos", async function () {
    const task = "walk the dog";
    const date1 = "20110101"
    const res = await supertest(app)
    .post("/api/todos")
    .send({ task: task, completionDate: date1})
    
    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual({
        success: true,
        payload: {
            id: expect.any(Number),
            task: expect.any(String),
            completion_date: expect.any(String)
        }
    })
})

test("POST /api/todos SHOULD FAIL", async function () {
    // const task = undefined;
    // const date1 = "20110101";
    const res = await supertest(app)
    .post("/api/todos")
    
    expect(res.status).toBe(400);
    expect(res.body).toStrictEqual({
        success: false,
        error: "Please provide a 'task' and 'completionDate'"
    })
})





// test("POST /api/todos", async function () {
//     const errorMessage = "Please provide a 'task' and 'completionDate'"
//     const res = await supertest(app)
//     .post("/api/todos")
//     .send({ error: errorMessage })
    
//     expect(res.status).toBe(400);
//     expect(res.body).toStrictEqual({
//         success: false,
//         payload: {
//            error: expect.any(String)
//         }
//     })
// })


// Write a test
// Send a request to the server
//    URL must be correct
//    Include any data in the request (if necessary)
// Check response status code
//    Is the status code as expected?
// Check response body
//    Does it contain the expected data?
// Check the outer most level of the response object
//    If there's an array, visit each item in the response array. Assert if it is as expected.
// Check response headers (if needed)



// Sends a GET /users/4 request to our app using Supertest
// Checks if the response's HTTP status code is 200
// Checks if the response's body is an object with the structure { success: true, payload: { id: 4, username: any string } }

// test("GET /api/todos", async function () {
//     const response = await supertest(app).get("/users/4");
    
//     expect(response.status).toBe(200);

//     expect(response.body).toStrictEqual({
//         success: true,
//         payload: expect.anything(),
//     });

//     expect(response.body).toStrictEqual({
//         success: true,
//         payload: {
//             id: expect.any(Number),
//             username: expect.any(String),
//         }
//     })

// })

// Write an asynchronous test (in routes/users.test.js) which:

// test("GET /users/99", async function () {
//     const response = await supertest(app).get("/users/99");

//     expect(response.status).toBe(404)

//     expect(response.body).toStrictEqual({
//         success: true,
//         reason: "No user with ID 99 was found.",
//     })

//     console.log(response.body)
// });
