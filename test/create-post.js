const assert = require("assert");

// 📌 Simulación de la función `createPost`
async function createPost({ jsonContent }, formData) {
  const user = { id: "123" }; // Simulación de un usuario autenticado

  if (!user) {
    return { redirect: "/api/auth/login" };
  }

  const title = formData.get("title");
  const imageUrl = formData.get("imageUrl");
  const subName = formData.get("subName");

  if (!title || !subName) {
    return {
      message: "Title and SubName are required",
      status: "error",
    };
  }

  // Definir contenido por defecto
  const defaultContent = {
    type: "doc",
    content: [{ type: "paragraph", content: [{ text: "Hello world", type: "text" }] }],
  };

  // Si `jsonContent` es null o no tiene contenido válido, usa el contenido por defecto
  const contentToSave =
    jsonContent && jsonContent.content && jsonContent.content.length > 0
      ? jsonContent
      : defaultContent;

  return { redirect: `/post/1`, content: contentToSave };
}

// 📌 TEST 1: Creación exitosa de un post con contenido
(async function testCreatePostSuccess() {
  const formData = new Map();
  formData.set("title", "My Post");
  formData.set("subName", "Tech");
  formData.set("imageUrl", "https://example.com/image.jpg");

  const jsonContent = {
    type: "doc",
    content: [{ type: "paragraph", content: [{ text: "Custom Content", type: "text" }] }],
  };

  const result = await createPost({ jsonContent }, formData);
  assert.strictEqual(result.redirect, "/post/1", "La redirección no es correcta");
  assert.deepStrictEqual(result.content, jsonContent, "El contenido guardado no es el correcto");

  console.log("✅ TEST 1: Creación exitosa de post con contenido pasó.");
})();

// 📌 TEST 2: Creación exitosa con contenido vacío (usa contenido por defecto)
(async function testCreatePostDefaultContent() {
  const formData = new Map();
  formData.set("title", "My Post");
  formData.set("subName", "Tech");

  const jsonContent = null; // Simulación de contenido vacío

  const result = await createPost({ jsonContent }, formData);
  assert.strictEqual(result.redirect, "/post/1", "La redirección no es correcta");
  assert.strictEqual(result.content.content[0].content[0].text, "Hello world", "El contenido por defecto no se usó correctamente");

  console.log("✅ TEST 2: Creación exitosa con contenido por defecto pasó.");
})();

// 📌 TEST 3: Fallo por falta de título
(async function testCreatePostMissingTitle() {
  const formData = new Map();
  formData.set("subName", "Tech");

  const result = await createPost({ jsonContent: null }, formData);
  assert.strictEqual(result.status, "error", "No se generó el error esperado");
  assert.strictEqual(result.message, "Title and SubName are required", "El mensaje de error no coincide");

  console.log("✅ TEST 3: Error por falta de título pasó.");
})();

// 📌 TEST 4: Fallo por falta de subName
(async function testCreatePostMissingSubName() {
  const formData = new Map();
  formData.set("title", "My Post");

  const result = await createPost({ jsonContent: null }, formData);
  assert.strictEqual(result.status, "error", "No se generó el error esperado");
  assert.strictEqual(result.message, "Title and SubName are required", "El mensaje de error no coincide");

  console.log("✅ TEST 4: Error por falta de subName pasó.");
})();
