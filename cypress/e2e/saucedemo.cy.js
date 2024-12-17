describe(" SauceDemo Auth tests", () => {
  it("auth woth correct credentials", () => {
    cy.visit("https://www.saucedemo.com/");


    cy.get("input[data-test='username']").type("standard_user");
    cy.get("input[data-test='password']").type("secret_sauce");

    cy.get("input[type='submit']").click();


    cy.url().should("include", "/inventory.html");
    cy.contains("Products").should("be.visible");
  });
});