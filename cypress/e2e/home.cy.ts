describe("Página Principal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Debería mostrar el título de la página", () => {
    cy.get("h1").should("contain", "Home");
  });

  it("Debería mostrar el formulario de creación de post", () => {
    cy.get("a").contains("Crear publiación").should("exist");
  });

  it("Debería mostrar comunidades en tendencia", () => {
    cy.contains("Comunidades en tendencia").should("exist");
  });

  it("Debería navegar a la página de comunidades", () => {
    cy.get("a").contains("Comunidades").click();
    cy.url().should("include", "/communities");
  });
});
