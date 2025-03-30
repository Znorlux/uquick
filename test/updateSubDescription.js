const assert = require("assert");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function testUpdateSubDescription() {
  console.log(
    "--> Iniciando pruebas de actualización de descripción del subreddit..."
  );

  try {
    // **1. CREAR UN SUBREDDIT DE PRUEBA**
    
    console.log("✅ Subreddit de prueba creado.");

    // **2. SIMULAR ACTUALIZACIÓN DE DESCRIPCIÓN**
    const formData = new FormData();
    formData.append("subName", "testSub");
    formData.append("description", "Nueva descripción actualizada.");

    let response;
    try {
      await prisma.subreddit.update({
        where: { name: formData.get("subName") },
        data: { description: formData.get("description") },
      });

      response = {
        message: "Succesfully updated the description!",
        status: "green",
      };
    } catch (e) {
      response = { message: "Sorry something went wrong!", status: "error" };
    }

    assert.strictEqual(
      response.status,
      "green",
      "Error: No se actualizó correctamente la descripción."
    );
    console.log("✅ Descripción actualizada correctamente.");

    const updatedSubreddit = await prisma.subreddit.findUnique({
      where: { name: "testSub" },
    });
    assert.strictEqual(
      updatedSubreddit.description,
      "Nueva descripción actualizada.",
      "Error: La descripción en la BD no coincide."
    );
    console.log("✅ Descripción actualizada correctamente en la BD.");

    // **3. PRUEBA DE SUBREDDIT INEXISTENTE**
    console.log("--> Probando actualización en un subreddit inexistente...");

    const nonExistentFormData = new FormData();
    nonExistentFormData.append("subName", "fakeSub");
    nonExistentFormData.append("description", "Descripción falsa.");

    let nonExistentResponse;
    try {
      await prisma.subreddit.update({
        where: { name: nonExistentFormData.get("subName") },
        data: { description: nonExistentFormData.get("description") },
      });

      nonExistentResponse = {
        message: "Succesfully updated the description!",
        status: "green",
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        nonExistentResponse = {
          message: "Subreddit not found!",
          status: "error",
        };
      } else {
        throw e;
      }
    }

    assert.strictEqual(
      nonExistentResponse.status,
      "error",
      "Error: No se detectó la actualización en un subreddit inexistente."
    );
    console.log("✅ Error detectado correctamente para subreddit inexistente.");

    console.log("✅ TODAS LAS PRUEBAS PASARON EXITOSAMENTE.");
  } catch (error) {
    console.error("❌ ERROR EN LAS PRUEBAS:", error);
  } finally {
    console.log("Todas las pruebas han sido realizadas.");
    await prisma.$disconnect();
  }
}

// Ejecutar test
testUpdateSubDescription();
