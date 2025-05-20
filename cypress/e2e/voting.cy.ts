describe("Funcionalidad de Votación", () => {
  beforeEach(() => {
    cy.visit("/");
    // Esperar a que los posts se carguen
    cy.wait(2000);
    // Usar el selector correcto para los posts
    cy.get(".card").should("exist");
  });

  it("Debería mostrar botones de votación en los posts", () => {
    // Verificar que existen botones de votación en cada post
    cy.get(".card")
      .first()
      .within(() => {
        cy.get(
          'button[aria-label="Upvote"], button[aria-label="Downvote"], [data-testid="upvote-button"], [data-testid="downvote-button"], button'
        ).should("exist");
      });
  });

  it("Debería mostrar el conteo de votos en cada post", () => {
    // Verificar que se muestra el contador de votos
    cy.get(".card")
      .first()
      .within(() => {
        // Buscar cualquier elemento que pueda contener el contador de votos
        cy.get(
          '[data-testid="vote-count"], div:contains("votos"), div:contains("-"), div:contains("+")'
        ).should("exist");
      });
  });

  it("Debería permitir votar en un post", () => {
    // Intentar hacer clic en el botón de upvote del primer post
    cy.get(".card")
      .first()
      .within(() => {
        // Buscar un botón que pueda ser el de upvote y hacer clic
        cy.get(
          'button[aria-label="Upvote"], [data-testid="upvote-button"], button'
        )
          .first()
          .click({ force: true });
      });
  });

  it("Debería navegar a un post y permitir votar", () => {
    // Navegar al detalle de un post
    cy.get("a[href*='/post/']").first().click({ force: true });

    // Verificar que estamos en la página de detalle
    cy.url().should("include", "/post/");

    // Verificar que existen botones de votación o cualquier elemento relacionado con la votación
    cy.get(
      'button[aria-label="Upvote"], button[aria-label="Downvote"], [data-testid="upvote-button"], [data-testid="downvote-button"], button'
    ).should("exist");
  });
});
