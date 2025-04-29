const assert = require("assert");
const { PrismaClient } = require("@prisma/client");
const { generateUsername } = require("unique-username-generator");

const prisma = new PrismaClient();

async function testInsertUser() {
  console.log("-->  Iniciando pruebas de HU-3 Registrar usuario...");
  try {
    const dates = {
      id: "test",
      email: "test@example.com",
      firstName: "Juan",
      lastName: "Pérez",
      imageUrl: "https://example.com/avatar.jpg",
    };

    let dbUser = await prisma.user.findUnique({
      where: { id: dates.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: dates.id,
          email: dates.email ?? "",
          firstName: dates.firstName ?? "",
          lastName: dates.lastName ?? "",
          imageUrl: dates.imageUrl,
          userName: generateUsername("-", 3, 15),
        },
      });
    }


    // Verificar que el usuario fue creado correctamente
    assert.ok(dbUser, " Error: El usuario no se insertó en la base de datos.");
    console.log(" Usuario insertado correctamente.");

    // Verificar que el ID del usuario insertado coincide con el esperado
    assert.strictEqual(
      dbUser.id,
      dates.id,
      " Error: El ID del usuario no coincide con el esperado."
    );
    console.log(" El ID del usuario coincide con el esperado.");

    // Verificar que el email insertado es correcto
    assert.strictEqual(
      dbUser.email,
      dates.email,
      " Error: El email del usuario no coincide."
    );
    console.log(" El email del usuario coincide.");

    // Verificar que el nombre del usuario fue almacenado correctamente
    assert.strictEqual(
      dbUser.firstName,
      dates.firstName,
      " Error: El nombre del usuario no coincide."
    );
    console.log(" El nombre del usuario coincide.");

    // Verificar que el username fue generado correctamente
    assert.ok(
      dbUser.userName.length > 0,
      " Error: No se generó un username válido."
    );
    console.log(" Se generó un username correctamente.");

    console.log(" TODAS LAS PRUEBAS PASARON EXITOSAMENTE.");

  } catch (error) {
    console.error(" ERROR EN LAS PRUEBAS:", error);
  } finally {
    console.log("Todas las pruebas han sido realizadas.")
  }
}

testInsertUser();
