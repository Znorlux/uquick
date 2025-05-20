describe("Funcionalidad de Chatbot", () => {
  beforeEach(() => {
    cy.visit("/chatbot");
  });

  it("Debería mostrar la interfaz del chatbot", () => {
    // Verificar que la página del chatbot carga correctamente
    cy.url().should("include", "/chatbot");

    // Verificar elementos esenciales de la interfaz
    cy.get('input, textarea, [contenteditable="true"]').should("exist");
    cy.get("button").contains("Enviar", { matchCase: false }).should("exist");
  });

  it("Debería permitir enviar mensajes", () => {
    // Escribir un mensaje en el campo de texto
    const testMessage = "Hola, ¿cómo estás?";
    cy.get('input, textarea, [contenteditable="true"]').type(testMessage);

    // Enviar el mensaje
    cy.get("button").contains("Enviar", { matchCase: false }).click();

    // Verificar que el mensaje aparece en la conversación
    cy.contains(testMessage).should("exist");
  });

  it("Debería recibir respuesta del chatbot", () => {
    // Escribir un mensaje en el campo de texto
    const testMessage = "¿Qué es uquick?";
    cy.get('input, textarea, [contenteditable="true"]').type(testMessage);

    // Enviar el mensaje
    cy.get("button").contains("Enviar", { matchCase: false }).click();

    // Verificar que el mensaje aparece en la conversación
    cy.contains(testMessage).should("exist");

    // Esperar a recibir una respuesta (con un timeout razonable)
    cy.contains('.message, .chat-message, div:contains("Bot")', /.+/, {
      timeout: 15000,
    }).should("exist");
  });
});
