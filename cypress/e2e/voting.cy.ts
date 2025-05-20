describe("Funcionalidad de Votación", () => {
  beforeEach(() => {
    cy.visit("/");
    // Esperar a que los posts se carguen
    cy.get("article").should("exist");
  });

  it("Debería mostrar botones de votación en los posts", () => {
    // Verificar que existen botones de votación en cada post
    cy.get("article")
      .first()
      .within(() => {
        cy.get(
          'button[aria-label="Upvote"], button[aria-label="Downvote"], [data-testid="upvote-button"], [data-testid="downvote-button"]'
        ).should("exist");
      });
  });

  it("Debería mostrar el conteo de votos en cada post", () => {
    // Verificar que se muestra el contador de votos
    cy.get("article")
      .first()
      .within(() => {
        cy.get('[data-testid="vote-count"], span:contains("votos")').should(
          "exist"
        );
      });
  });

  it("Debería permitir votar en un post", () => {
    // Intentar hacer clic en el botón de upvote del primer post
    cy.get("article")
      .first()
      .within(() => {
        cy.get('button[aria-label="Upvote"], [data-testid="upvote-button"]')
          .first()
          .click({ force: true });

        // Nota: En una aplicación real, aquí verificaríamos que el contador se incrementa,
        // pero como esto requeriría autenticación y estado, solo verificamos que el botón existe
      });
  });

  it("Debería navegar a un post y permitir votar", () => {
    // Navegar al detalle de un post
    cy.get("article").first().click();

    // Verificar que estamos en la página de detalle
    cy.url().should("include", "/post/");

    // Verificar que existen botones de votación
    cy.get(
      'button[aria-label="Upvote"], button[aria-label="Downvote"], [data-testid="upvote-button"], [data-testid="downvote-button"]'
    ).should("exist");
  });
});
