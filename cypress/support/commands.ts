/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para simular la autenticación
       * @example cy.loginByAuth0()
       */
      loginByAuth0(): Chainable<Element>;
    }
  }
}

// Esta función simula un inicio de sesión exitoso
// En una aplicación real, deberías implementar la autenticación adecuada
Cypress.Commands.add("loginByAuth0", () => {
  // Este es un ejemplo simplificado. En una app real,
  // deberías conectarte a la API de autenticación o
  // simular correctamente el proceso de login

  // Simulamos un token JWT
  const fakeToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  // Almacenamos el token en localStorage
  // (ajusta esto según cómo funcione tu sistema de autenticación)
  cy.window().then((window) => {
    window.localStorage.setItem("auth_token", fakeToken);

    // Aquí puedes agregar más información relacionada con el usuario
    window.localStorage.setItem("user_id", "test-user-id");
    window.localStorage.setItem("user_name", "test-user");
  });
});

export {};
