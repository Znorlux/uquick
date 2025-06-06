"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";
import { transfer } from "thirdweb/extensions/erc20";
import { contract, account } from "./client";
import { sendTransaction } from "thirdweb";

export async function updateUsername(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const username = formData.get("username") as string;

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
      },
    });

    return {
      message: "Succesfully Updated name",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is alredy used",
          status: "error",
        };
      }
    }

    throw e;
  }
}

export async function getAllCommunities() {
  const communities = await prisma.subreddit.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      name: true,
      description: true,
      id: true,
      createdAt: true,
    },
  });

  return communities;
}

export async function createCommunity(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const name = formData.get("name") as string;

    const data = await prisma.subreddit.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    return redirect(`/r/${data.name}`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This Name is alredy used",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function updateSubDescription(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const subName = formData.get("subName") as string;
    const description = formData.get("description") as string;

    await prisma.subreddit.update({
      where: {
        name: subName,
      },
      data: {
        description: description,
      },
    });

    return {
      status: "green",
      message: "Succesfully updated the description!",
    };
  } catch (e) {
    return {
      status: "error",
      message: "Sorry something went wrong!",
    };
  }
}

export async function createPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const subName = formData.get("subName") as string;

  // Definir contenido por defecto si el contenido está vacío o es null
  const defaultContent: JSONContent = {
    type: "doc",
    content: [
      { type: "paragraph", content: [{ text: "Hello world", type: "text" }] },
    ],
  };

  // Si jsonContent es null o no tiene contenido válido, usa el contenido por defecto
  const contentToSave =
    jsonContent && jsonContent.content && jsonContent.content.length > 0
      ? jsonContent
      : defaultContent;

  // Crear el post con el contenido ajustado
  const data = await prisma.post.create({
    data: {
      title: title,
      imageString: imageUrl ?? undefined,
      subName: subName,
      userId: user.id,
      textContent: contentToSave, // Guardar el contenido ajustado
    },
  });

  return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const postId = formData.get("postId") as string;
  const voteDirection = formData.get("voteDirection") as TypeOfVote;

  const vote = await prisma.vote.findFirst({
    where: {
      postId: postId,
      userId: user.id,
    },
  });
  if (voteDirection === "UP") {
    // Obtener la información del post y su autor
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { User: { select: { walletAddress: true } } },
    });

    if (post?.User?.walletAddress) {
      try {
        const transaction = transfer({
          contract,
          to: post.User.walletAddress,
          amount: "0.01",
        });
        const result = await sendTransaction({
          transaction,
          account,
        });
        console.log("Result:", result);
      } catch (error) {
        console.error("Error en la transferencia de UNI:", error);
      }
    }
  }

  if (vote) {
    if (vote.voteType === voteDirection) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      return revalidatePath("/", "page");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: voteDirection,
        },
      });
      return revalidatePath("/", "page");
    }
  }

  await prisma.vote.create({
    data: {
      voteType: voteDirection,
      userId: user.id,
      postId: postId,
    },
  });

  return revalidatePath("/", "page");
}

export async function createComment(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  const data = await prisma.comemnt.create({
    data: {
      text: comment,
      userId: user.id,
      postId: postId,
    },
  });

  revalidatePath(`/post/${postId}`);
}

// --- ADD OR UPDATE WALLET ADDRESS --- //
export async function updateWalletAddress(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const newWalletAddress = formData.get("walletAddress") as string;

  // Obtener la wallet actual del usuario
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { walletAddress: true },
  });

  if (existingUser?.walletAddress === newWalletAddress) {
    return {
      message: "La dirección de wallet es la misma que la registrada",
      status: "error",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        walletAddress: newWalletAddress,
      },
    });

    return {
      message: "Dirección de wallet actualizada con éxito",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Esta dirección de wallet ya está en uso",
          status: "error",
        };
      }
    }

    throw e;
  }
}
