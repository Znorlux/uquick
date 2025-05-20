describe("Funcionalidad de Comentarios", () => {
  beforeEach(() => {
    // Visitar la página principal y hacer clic en el primer post
    cy.visit("/");
    cy.get("article").first().click();
  });

  it("Debería mostrar la sección de comentarios en un post", () => {
    // Verificar que existe una sección de comentarios
    cy.contains("Comentarios").should("exist");
  });

  it("Debería mostrar el formulario para agregar comentarios", () => {
    // Verificar que existe un formulario para comentarios
    cy.get("form").should("exist");
    cy.get('textarea, [contenteditable="true"]').should("exist");
  });

  it("Debería mostrar comentarios existentes", () => {
    // Verificar que se muestran los comentarios (si existen)
    cy.get(
      '[data-testid="comment-item"], .comment, div:contains("comentó")'
    ).should("exist");
  });

  it("Debería permitir votar en comentarios", () => {
    // Buscar botones de votación en los comentarios
    cy.get(
      '.comment button, [data-testid="upvote-button"], [data-testid="downvote-button"]'
    ).should("exist");
  });
});
