describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("Checking header", () => {
  it("Checking header name is correct", () => {
    cy.visit("http://localhost:3000");

    cy.get('header > p').should('contain',"Yet another app");
  });
});

describe("Checking create button", () => {
  it("Checking create button is working", () => {
    cy.visit("http://localhost:3000");

    cy.get('#new-todo > button').should('contain',"Create");
  });
});


// describe("Checking create button", () => {
//   it("Checking create button is working", () => {
//     cy.visit("http://localhost:3000");

//     cy.request('POST', 'http://localhost:3000', { task: 'ironing', completion_date:'20221212' }).then(
//       (response) => {
//         // response.body is automatically serialized into JSON
//         expect(response.body).to.have.property('task', 'ironing', 'completion_date','20221212') // true
//       }
//     )
//   });
// });

