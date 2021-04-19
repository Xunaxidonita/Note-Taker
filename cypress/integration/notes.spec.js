context("Location", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it("redirects to notes page", () => {
    cy.get(".btn-primary").click();

    cy.get(".list-group-item").should("have.length", 2);
  });
});
