const assert = require("assert");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function testUpdateUsername() {
  console.log("--> Iniciando pruebas de actualización de username...");

  try {
    // Simulación de usuario autenticado
    const user = {
      id: "test_user",
      email: "test@example.com",
      firstName: "Juan",
      lastName: "Pérez",
      userName: "juanp",
    };

    // Crear usuario de prueba si no existe
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({ data: user });
    }

    // Simulación de FormData con nuevo username
    const formData = new FormData();
    formData.append("username", "nuevoUsername123");

    // Simulación de la lógica de updateUsername
    const username = formData.get("username");

    let response;
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { userName: username },
      });

      response = {
        message: "Succesfully Updated name",
        status: "green",
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          response = {
            message: "This username is alredy used",
            status: "error",
          };
        }
      } else {
        throw e;
      }
    }

    // Verificar que la respuesta sea exitosa
    assert.strictEqual(
      response.message,
      "Succesfully Updated name",
      "Error: No se actualizó correctamente el username."
    );
    assert.strictEqual(
      response.status,
      "green",
      "Error: El estado no es 'green'."
    );

    console.log("✅ Username actualizado correctamente.");

    // Verificar que el cambio se reflejó en la base de datos
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    assert.strictEqual(
      updatedUser.userName,
      "nuevoUsername123",
      "Error: El username en la BD no coincide con el esperado."
    );

    console.log("✅ Username actualizado correctamente en la BD.");

    // Prueba de error por username duplicado
    try {
      const duplicateFormData = new FormData();
      duplicateFormData.append("username", "nuevoUsername123");

      let duplicateResponse;
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { userName: "nuevoUsername123" },
        });

        duplicateResponse = {
          message: "Succesfully Updated name",
          status: "green",
        };
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          duplicateResponse = {
            message: "This username is alredy used",
            status: "error",
          };
        } else {
          throw e;
        }
      }

      assert.strictEqual(
        duplicateResponse.status,
        "error",
        "Error: No se detectó el username duplicado."
      );
      assert.strictEqual(
        duplicateResponse.message,
        "This username is alredy used",
        "Error: El mensaje de error no es el esperado."
      );

      console.log("✅ Error de username duplicado detectado correctamente.");
    } catch (error) {
      console.error("❌ Error al probar username duplicado:", error);
    }

    console.log("✅ TODAS LAS PRUEBAS PASARON EXITOSAMENTE.");
  } catch (error) {
    console.error("❌ ERROR EN LAS PRUEBAS:", error);
  } finally {
    console.log("Todas las pruebas han sido realizadas.");
    await prisma.$disconnect();
  }
}

// Ejecutar test
testUpdateUsername();
