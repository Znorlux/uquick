const assert = require("assert");

async function createCommunity(prevState, formData) {
  const user = { id: "123" }; // Simulación de un usuario autenticado

  if (!user) {
    return { redirect: "/api/auth/login" };
  }

  try {
    const name = formData.get("name");

    if (!name) {
      throw new Error("Community name is required");
    }

    return { redirect: `/r/${name}` };
  } catch (e) {
    if (e.message === "Community name is required") {
      return {
        message: "Community name is required",
        status: "error",
      };
    }
    throw e;
  }
}

// 📌 TEST 1: Debe redirigir a la comunidad creada
(async function testCreateCommunitySuccess() {
  const formData = new Map();
  formData.set("name", "myCommunity");

  const result = await createCommunity(null, formData);
  assert.strictEqual(result.redirect, "/r/myCommunity", "La redirección no es correcta");

  console.log("✅ TEST 1: Creación exitosa de comunidad pasó.");
})();

// 📌 TEST 2: Debe fallar si no se proporciona un nombre
(async function testCreateCommunityFailure() {
  const formData = new Map();

  const result = await createCommunity(null, formData);
  assert.strictEqual(result.status, "error", "El mensaje de error no se generó correctamente");
  assert.strictEqual(result.message, "Community name is required", "El mensaje de error no coincide");

  console.log("✅ TEST 2: Error por falta de nombre pasó.");
})();
