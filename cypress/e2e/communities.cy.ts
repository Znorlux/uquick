describe("Funcionalidad de Comunidades", () => {
  it("Debería mostrar la página de comunidades", () => {
    cy.visit("/communities");
    cy.contains("Comunidades").should("exist");
  });

  it("Debería permitir navegar a la página de creación de comunidades", () => {
    cy.visit("/");
    cy.get("button, a")
      .contains("Crear comunidad")
      .should("exist")
      .click({ force: true });
    cy.url().should("include", "/r/create");
  });

  it("Debería mostrar el formulario de creación de comunidad", () => {
    cy.visit("/r/create");
    cy.get("form").should("exist");
    cy.get('input[name="name"]').should("exist");
    cy.get("button").contains("Crear comunidad").should("exist");
  });

  it("Debería permitir visitar una comunidad específica", () => {
    cy.visit("/communities");
    cy.get('a[href*="/r/"]').first().click();
    cy.url().should("include", "/r/");
    cy.contains("Acerca de esta comunidad").should("exist");
    cy.get("div").contains("r/").should("exist");
  });
});
