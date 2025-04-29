const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe("Actualizar dirección de wallet del usuario", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("debería actualizar correctamente la dirección de wallet si es diferente", async () => {
    //  Arrange
    const testUser = {
      id: "test_user",
      walletAddress: "0x123456789ABCDEF",
    };
    const newWalletAddress = "0x987654321FEDCBA";

    prisma.user.findUnique.mockResolvedValueOnce({
      walletAddress: testUser.walletAddress,
    });

    prisma.user.update.mockResolvedValueOnce({
      id: testUser.id,
      walletAddress: newWalletAddress,
    });

    // Act
    const existingUser = await prisma.user.findUnique({
      where: { id: testUser.id },
      select: { walletAddress: true },
    });

    let response;
    if (
      existingUser?.walletAddress.toLowerCase() ===
      newWalletAddress.toLowerCase()
    ) {
      response = {
        message: "La dirección de wallet es la misma que la registrada",
        status: "error",
      };
    } else {
      await prisma.user.update({
        where: { id: testUser.id },
        data: { walletAddress: newWalletAddress },
      });
      response = {
        message: "Dirección de wallet actualizada con éxito",
        status: "green",
      };
    }

    // Assert 
    expect(existingUser).toBeDefined();
    expect(response).toBeDefined();
    expect(response.status).toBe("green");
    expect(response.message).toBe("Dirección de wallet actualizada con éxito");
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: testUser.id },
      data: { walletAddress: newWalletAddress },
    });
  });

  it("debería devolver error si la nueva dirección de wallet es igual a la existente", async () => {
    // Arrange
    const testUser = {
      id: "test_user",
      walletAddress: "0x123456789ABCDEF",
    };
    const sameWalletAddress = "0x123456789ABCDEF";

    prisma.user.findUnique.mockResolvedValueOnce({
      walletAddress: testUser.walletAddress,
    });

    // Act
    const existingUser = await prisma.user.findUnique({
      where: { id: testUser.id },
      select: { walletAddress: true },
    });

    let response;
    if (
      existingUser?.walletAddress.toLowerCase() ===
      sameWalletAddress.toLowerCase()
    ) {
      response = {
        message: "La dirección de wallet es la misma que la registrada",
        status: "error",
      };
    } else {
      await prisma.user.update({
        where: { id: testUser.id },
        data: { walletAddress: sameWalletAddress },
      });
      response = {
        message: "Dirección de wallet actualizada con éxito",
        status: "green",
      };
    }

    //  Assert 
    expect(existingUser).toBeDefined();
    expect(response).toBeDefined();
    expect(response.status).toBe("error");
    expect(response.message).toBe("La dirección de wallet es la misma que la registrada");
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});
