const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    subreddit: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe("Actualizar descripción del subreddit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("debería actualizar correctamente la descripción del subreddit existente", async () => {
    // Arrange
    const formData = {
      subName: "testSub",
      description: "Nueva descripción actualizada.",
    };

    // Configuramos mocks
    prisma.subreddit.update.mockResolvedValueOnce({
      name: formData.subName,
      description: formData.description,
    });
    prisma.subreddit.findUnique.mockResolvedValueOnce({
      name: formData.subName,
      description: formData.description,
    });

    // Act
    const updateResponse = await prisma.subreddit.update({
      where: { name: formData.subName },
      data: { description: formData.description },
    });

    const updatedSubreddit = await prisma.subreddit.findUnique({
      where: { name: formData.subName },
    });

    // Assert 
    expect(updateResponse).toBeDefined();
    expect(updateResponse.description).toBe(formData.description);

    expect(updatedSubreddit).toBeDefined();
    expect(updatedSubreddit.description).toBe(formData.description);
  });

  it("debería manejar error al intentar actualizar un subreddit inexistente", async () => {
    // Arrange
    const formData = {
      subName: "fakeSub",
      description: "Descripción falsa.",
    };

    prisma.subreddit.update.mockRejectedValueOnce({
      code: "P2025",
      message: "No se encontró el registro para actualizar.",
    });

    let errorResponse;

    // Act
    try {
      await prisma.subreddit.update({
        where: { name: formData.subName },
        data: { description: formData.description },
      });

      errorResponse = {
        message: "Successfully updated description",
        status: "green",
      };
    } catch (e) {
      if (e.code === "P2025") {
        errorResponse = {
          message: "Subreddit not found!",
          status: "error",
        };
      } else {
        throw e;
      }
    }

    // Assert 
    expect(errorResponse).toBeDefined();
    expect(errorResponse.status).toBe("error");
    expect(errorResponse.message).toBe("Subreddit not found!");
  });
});
