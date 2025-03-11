const assert = require("assert");
const { PrismaClient } = require("@prisma/client");
const { generateUsername } = require("unique-username-generator");

const prisma = new PrismaClient();

async function testInsertUser() {
  console.log("🚀 Iniciando pruebas de inserción de usuario...");

  try {
    const testUser = {
      id: "test-user-123",
      email: "test@example.com",
      given_name: "John",
      family_name: "Doe",
      picture: "https://example.com/avatar.jpg",
    };

    let dbUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    });

    // Si no existe, lo creamos
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: testUser.id,
          email: testUser.email ?? "",
          firstName: testUser.given_name ?? "",
          lastName: testUser.family_name ?? "",
          imageUrl: testUser.picture,
          userName: generateUsername("-", 3, 15),
        },
      });
    }

    // Verificar que el usuario fue creado correctamente
    assert.ok(dbUser, "❌ Error: El usuario no se insertó en la base de datos.");
    console.log("✅ TEST 1: Usuario insertado correctamente.");

    // Verificar que el ID del usuario insertado coincide con el esperado
    assert.strictEqual(
      dbUser.id,
      testUser.id,
      "❌ Error: El ID del usuario no coincide con el esperado."
    );
    console.log("✅ TEST 2: El ID del usuario coincide con el esperado.");

    // Verificar que el email insertado es correcto
    assert.strictEqual(
      dbUser.email,
      testUser.email,
      "❌ Error: El email del usuario no coincide."
    );
    console.log("✅ TEST 3: El email del usuario coincide.");

    // Verificar que el nombre del usuario fue almacenado correctamente
    assert.strictEqual(
      dbUser.firstName,
      testUser.given_name,
      "❌ Error: El nombre del usuario no coincide."
    );
    console.log("✅ TEST 4: El nombre del usuario coincide.");

    // Verificar que el username fue generado correctamente
    assert.ok(
      dbUser.userName.length > 0,
      "❌ Error: No se generó un username válido."
    );
    console.log("✅ TEST 5: Se generó un username correctamente.");

    console.log("🎉 TODAS LAS PRUEBAS PASARON EXITOSAMENTE.");

  } catch (error) {
    console.error("❌ ERROR EN LAS PRUEBAS:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testInsertUser();
