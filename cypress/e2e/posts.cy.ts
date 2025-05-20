describe("Funcionalidad de Posts", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Debería mostrar una lista de posts", () => {
    // Verificamos que existan posts en la página principal
    cy.get("div").should("contain.text", "Crear publiación");
    // Esperamos a que los posts se carguen (asumiendo que hay suspense)
    cy.get("article").should("exist");
  });

  it("Debería permitir navegar a un post individual", () => {
    // Hacemos clic en el primer post
    cy.get("article").first().click();
    // Verificamos que la URL cambie a la página de un post específico
    cy.url().should("include", "/post/");
  });

  it("Debería mostrar la paginación si hay suficientes posts", () => {
    cy.get("nav").find('a[aria-label="Pagination"]').should("exist");
  });

  it("Debería permitir crear una nueva publicación", () => {
    // Hacemos clic en el botón de crear publicación
    cy.get("button, a")
      .contains("Crear publiación")
      .should("exist")
      .click({ force: true });
    // Verificamos que estamos en la página de creación
    cy.url().should("include", "/r/home/create");
  });
});
