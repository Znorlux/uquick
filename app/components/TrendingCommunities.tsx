// components/TrendingCommunities.tsx
import { Card } from "@/components/ui/card";
import prisma from "../lib/db";
import Link from "next/link";

// Función para obtener las últimas 3 comunidades creadas
async function getTrendingCommunities() {
  const communities = await prisma.subreddit.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      name: true,
      description: true,
      id: true,
    },
  });

  return communities;
}

export async function TrendingCommunities() {
  const communities = await getTrendingCommunities();

  return (
    <Card className="p-4">
      <h2 className="font-medium mb-4">Comunidades en tendencia</h2>
      <ul>
        {communities.map((community) => (
          <li key={community.id} className="mb-3">
            <Link href={`/r/${community.name}`}>
              <div className="text-primary hover:underline font-semibold text-sm opacity-85">
                r/{community.name}
              </div>
            </Link>
            <p className=" text-xs text-muted-foreground">
              {community.description ||
                "No se ha proporcionado una descripción"}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
