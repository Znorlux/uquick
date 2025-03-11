const assert = require("assert");

// 📌 Simulación de la función `createCommunity`
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

// 📌 TEST 1: Creación exitosa de una comunidad
(async function testCreateCommunitySuccess() {
  const formData = new Map();
  formData.set("name", "myCommunity");

  const result = await createCommunity(null, formData);
  assert.strictEqual(result.redirect, "/r/myCommunity", "La redirección no es correcta");

  console.log("✅ TEST 1: Creación exitosa de comunidad pasó.");
})();

// 📌 TEST 2: Error al no proporcionar un nombre de comunidad
(async function testCreateCommunityFailure() {
  const formData = new Map();

  const result = await createCommunity(null, formData);
  assert.strictEqual(result.status, "error", "El mensaje de error no se generó correctamente");
  assert.strictEqual(result.message, "Community name is required", "El mensaje de error no coincide");

  console.log("✅ TEST 2: Error por falta de nombre pasó.");
})();

// 📌 TEST 3: Verifica que los nombres de comunidad sean sensibles a mayúsculas y minúsculas
(async function testCreateCommunityCaseSensitive() {
  const formData = new Map();
  formData.set("name", "MyCommunity");

  const result = await createCommunity(null, formData);
  assert.strictEqual(result.redirect, "/r/MyCommunity", "No se respetó el uso de mayúsculas en el nombre");

  console.log("✅ TEST 3: Sensibilidad a mayúsculas pasó.");
})();

// 📌 TEST 4: Debe manejar nombres de comunidad con caracteres especiales
(async function testCreateCommunitySpecialChars() {
  const formData = new Map();
  formData.set("name", "comunidad_123");

  const result = await createCommunity(null, formData);
  assert.strictEqual(result.redirect, "/r/comunidad_123", "No se manejaron bien los caracteres especiales");

  console.log("✅ TEST 4: Creación con caracteres especiales pasó.");
})();

