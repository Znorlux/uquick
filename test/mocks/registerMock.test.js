const { PrismaClient } = require("@prisma/client");
const { generateUsername } = require("unique-username-generator");

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe("Registrar usuario", () => {
  const testUser = {
    id: "mock-id-123",
    email: "mock@example.com",
    firstName: "Ana",
    lastName: "López",
    imageUrl: "https://example.com/avatar.jpg",
    userName: generateUsername("-", 3, 15),
  };

  it("debería llamar a prisma.user.create con los datos correctos", async () => {
    // Arrange
    const expectedUser = { ...testUser };
    prisma.user.create.mockResolvedValue(expectedUser);

    // Act
    const result = await prisma.user.create({ data: testUser });

    // Assert
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: testUser });
    expect(result).toEqual(expectedUser);
  });
});
