describe("Perfil de Usuario", () => {
  // Asumimos una ruta específica para un usuario de prueba
  // En un entorno de producción, deberías usar datos de prueba reales
  const testUserName = "test-user";

  it("Debería mostrar el perfil de un usuario", () => {
    cy.visit(`/u/${testUserName}`);

    // Verificar que estamos en el perfil correcto
    cy.url().should("include", `/u/${testUserName}`);

    // Verificar elementos típicos de un perfil de usuario
    cy.get("h1, h2, h3").should("contain", testUserName);
  });

  it("Debería mostrar las publicaciones del usuario", () => {
    cy.visit(`/u/${testUserName}`);

    // En la página de perfil, deberían mostrarse los posts del usuario
    cy.contains("Publicaciones").should("exist");
  });

  it("Debería permitir navegar a los ajustes del perfil", () => {
    // Primero, navegar a la página principal
    cy.visit("/");

    // Hacer clic en el menú de usuario (suponiendo que existe un dropdown)
    cy.get(
      '[data-testid="user-dropdown"], .user-dropdown, button:has(img[alt="profile"])'
    )
      .first()
      .click({ force: true });

    // Hacer clic en el enlace de configuración
    cy.contains("Ajustes").click({ force: true });

    // Verificar que estamos en la página de configuración
    cy.url().should("include", "/settings");
  });
});
