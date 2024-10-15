// pages/communities.tsx
import { Card } from "@/components/ui/card";
import { getAllCommunities } from "../actions";
import Image from "next/image";
import Link from "next/link";

export default async function CommunitiesPage() {
  const communities = await getAllCommunities();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="font-bold text-3xl mb-6 text-center">
        Comunidades Populares
      </h1>
      <p className="text-center text-muted-foreground mb-10">
        Explora las comunidades más activas y unete a la conversación
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community, index) => (
          <div
            key={community.id}
            className="bg-card p-4 rounded-xl shadow-md flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className="font-bold text-xl text-primary mr-4">
                {index + 1}
              </span>
              <Image
                src={`https://avatar.vercel.sh/${community.name}`}
                alt={`Image of ${community.name}`}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <Link href={`/r/${community.name}`}>
                  <div className="text-primary hover:underline font-semibold text-lg">
                    r/{community.name}
                  </div>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {community.description || "Sin descripción"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
