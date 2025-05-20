describe("Funcionalidad de Comunidades", () => {
  it("Debería mostrar la página de comunidades", () => {
    cy.visit("/communities");
    cy.contains("Comunidades").should("exist");
  });

  it("Debería permitir navegar a la página de creación de comunidades", () => {
    cy.visit("/");
    cy.get("a").contains("Crear comunidad").click();
    cy.url().should("include", "/r/create");
  });

  it("Debería mostrar el formulario de creación de comunidad", () => {
    cy.visit("/r/create");
    cy.get("form").should("exist");
    cy.get('input[name="name"]').should("exist");
    cy.get('textarea[name="description"]').should("exist");
  });

  it("Debería permitir visitar una comunidad específica", () => {
    // Primero navegamos a la lista de comunidades
    cy.visit("/communities");

    // Seleccionamos la primera comunidad y hacemos clic en ella
    cy.get('a[href*="/r/"]').first().click();

    // Verificamos que hemos entrado en una comunidad específica
    cy.url().should("include", "/r/");

    // Verificamos que se muestren posts de la comunidad
    cy.get("article").should("exist");
  });
});
