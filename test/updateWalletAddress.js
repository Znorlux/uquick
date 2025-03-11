const assert = require("assert");
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function testUpdateWalletAddress() {
  console.log(
    "--> Iniciando pruebas de actualización de dirección de wallet..."
  );

  try {
    // **1. CREAR UN USUARIO DE PRUEBA CON WALLET**
    const testUser = await prisma.user.upsert({
      where: { id: "test_user" },
      update: {},
      create: {
        id: "test_user",
        firstName: "Juan",
        lastName: "Pérez",
        email: "test@example.com",
        walletAddress: "0x123456789ABCDEF",
      },
    });

    console.log("✅ Usuario de prueba creado.");

    // **2. SIMULAR ACTUALIZACIÓN DE WALLET**
    const formData = new FormData();
    formData.append("walletAddress", "0x987654321FEDCBA");

    let response;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: testUser.id },
        select: { walletAddress: true },
      });

      console.log("Existing wallet:", existingUser?.walletAddress);
      console.log("New wallet:", formData.get("walletAddress"));

      if (
        existingUser?.walletAddress.toLowerCase() ===
        formData.get("walletAddress").toLowerCase()
      ) {
        response = {
          message: "La dirección de wallet es la misma que la registrada",
          status: "error",
        };
      } else {
        await prisma.user.update({
          where: { id: testUser.id },
          data: { walletAddress: formData.get("walletAddress") },
        });

        response = {
          message: "Dirección de wallet actualizada con éxito",
          status: "green",
        };
      }
    } catch (e) {
      response = { message: "Error desconocido", status: "error" };
    }

    assert.strictEqual(
      response.status,
      "green",
      "Error: No se actualizó correctamente la dirección de wallet."
    );
    console.log("✅ Dirección de wallet actualizada correctamente.");

    const updatedUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    });

    assert.strictEqual(
      updatedUser.walletAddress.toLowerCase(),
      "0x987654321FEDCBA".toLowerCase(),
      "Error: La dirección de wallet en la BD no coincide."
    );
    console.log("✅ Dirección de wallet actualizada correctamente en la BD.");

    console.log("✅ TODAS LAS PRUEBAS PASARON EXITOSAMENTE.");
  } catch (error) {
    console.error("❌ ERROR EN LAS PRUEBAS:", error);
  } finally {
    console.log("Todas las pruebas han sido realizadas.");
    await prisma.$disconnect();
  }
}

// Ejecutar test
testUpdateWalletAddress();
