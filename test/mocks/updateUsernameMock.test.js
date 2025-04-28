const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe("Actualizar username de usuario", () => {
  const testUser = {
    id: "test_user",
    email: "test@example.com",
    firstName: "Juan",
    lastName: "Pérez",
    userName: "juanp",
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("debería actualizar el username correctamente", async () => {
    // Arrange
    const newUsername = "nuevoUsername123";

    // findUnique inicialmente no encuentra el user, entonces lo crea
    prisma.user.findUnique.mockResolvedValueOnce(null);
    prisma.user.create.mockResolvedValueOnce({ ...testUser });

    // Luego de actualizar findUnique devuelve el usuario actualizado
    prisma.user.update.mockResolvedValueOnce({ ...testUser, userName: newUsername });
    prisma.user.findUnique.mockResolvedValueOnce({ ...testUser, userName: newUsername });

    // Act
    const dbUser = await prisma.user.findUnique({ where: { id: testUser.id } });

    if (!dbUser) {
      createdUser = await prisma.user.create({ data: testUser });
    }

    const response = await prisma.user.update({
      where: { id: createdUser.id },
      data: { userName: newUsername },
    });

    const updatedUser = await prisma.user.findUnique({ where: { id: createdUser.id } });

    // Assert 
    expect(createdUser).toBeDefined();
    expect(response).toBeDefined();
    expect(response.userName).toBe(newUsername);
    expect(updatedUser.userName).toBe(newUsername);
  });

  it("debería manejar error de username duplicado", async () => {
    // Arrange
    const duplicateUsername = "nuevoUsername123";

    // Simulamos que `update` lanza un error P2002 (username duplicado)
    prisma.user.update.mockRejectedValueOnce({
      code: "P2002",
      message: "Unique constraint failed on the fields: (`userName`)",
    });

    // Act
    let duplicateResponse;
    try {
      await prisma.user.update({
        where: { id: testUser.id },
        data: { userName: duplicateUsername },
      });
      duplicateResponse = { message: "Successfully Updated name", status: "green" };
    } catch (e) {
      if (e.code === "P2002") {
        duplicateResponse = { message: "This username is already used", status: "error" };
      } else {
        throw e;
      }
    }

    // Assert 
    expect(duplicateResponse).toBeDefined();
    expect(duplicateResponse.status).toBe("error");
    expect(duplicateResponse.message).toBe("This username is already used");
  });
});
