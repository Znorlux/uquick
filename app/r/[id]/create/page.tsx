"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import pfp from "../../../../public/pfp.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/app/components/TipTabEditor";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { useState } from "react";
import { createPost } from "@/app/actions";
import { JSONContent } from "@tiptap/react";
import { title } from "process";

const rules = [
  {
    id: 1,
    title: "Respeta a todos los usuarios",
    text: "No se tolerarán insultos ni lenguaje ofensivo.",
  },
  {
    id: 2,
    title: "Comparte información verificable",
    text: "Publica contenido preciso y evita difundir rumores.",
  },
  {
    id: 3,
    title: "Mantén tus datos actualizados",
    text: "Usa información correcta para solicitudes y registros.",
  },
  {
    id: 4,
    title: "Evita el spam",
    text: "No publiques contenido repetitivo o irrelevante.",
  },
  {
    id: 5,
    title: "Protege la privacidad",
    text: "No compartas información personal de otros sin su consentimiento.",
  },
];

export default function CreatePostRoute({
  params,
}: {
  params: { id: string };
}) {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [title, setTitle] = useState<null | string>(null);

  const createPostReddit = createPost.bind(null, { jsonContent: json });
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1 className="font-semibold">
          Comunidad (subreddit):{" "}
          <Link href={`/r/${params.id}`} className="text-primary">
            r/{params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              <Text className="h-4 w-4 mr-2" /> Publicación
            </TabsTrigger>
            <TabsTrigger value="image">
              <Video className="h-4 w-4 mr-2" />
              Imagen y Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={createPostReddit}>
                <input
                  type="hidden"
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                />
                <input type="hidden" name="subName" value={params.id} />
                <CardHeader>
                  <Label>Titulo</Label>
                  <Input
                    required
                    name="title"
                    placeholder="Titulo"
                    value={title ?? ""}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <TipTapEditor setJson={setJson} json={json} />
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Crear publicación" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                {imageUrl === null ? (
                  <UploadDropzone
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      alert("Error");
                    }}
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt="uploaded image"
                    width={500}
                    height={400}
                    className="h-80 rounded-lg w-full object-contain"
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[35%]">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-2">
            <Image className="h-10 w-10" src={pfp} alt="pfp" />
            <h1 className="font-medium">Reglas de uQuick</h1>
          </div>
          <Separator className="mt-2" />

          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium">
                  {item.id}.<span className="font-bold">{item.title}</span>:
                  <br />
                  {item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
