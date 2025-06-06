import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../actions";
import { DownVote, UpVote } from "./SubmitButtons";
import { RenderToJson } from "./RendertoJson";

interface IAppProps {
  title: string;
  jsonContent: any;
  id: string;
  subName: string;
  userName: string;
  imageString: string | null;
  voteCount: number;
  commentAmount: number;
}

export function PostCard({
  id,
  imageString,
  jsonContent,
  subName,
  title,
  userName,
  voteCount,
  commentAmount,
}: Readonly<IAppProps>) {
  return (
    <Card className="flex relative overflow-hidden hover:bg-gray-100 transition-all dark:hover:bg-zinc-900">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-">
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="UP" />
          <input type="hidden" name="postId" value={id} />
          <UpVote />
        </form>
        {voteCount}
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="DOWN" />
          <input type="hidden" name="postId" value={id} />
          <DownVote />
        </form>
      </div>

      <div>
        <div className="flex items-center gap-x-2 p-2">
          <Link className="font-semibold text-xs" href={`/r/${subName}`}>
            r/{subName}
          </Link>
          <p className="text-xs text-muted-foreground">
            Creado por:{" "}
            <Link className="hover:text-primary" href={`/u/${userName}`}>
              u/{userName}
            </Link>
          </p>
        </div>

        <Link href={`/post/${id}`} className="block">
          <div className="px-2">
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
          </div>

          <div className="max-h-[300px] overflow-hidden">
            {imageString ? (
              <Image
                src={imageString}
                alt="Post Image"
                width={600}
                height={300}
                className="w-full h-full"
              />
            ) : (
              <RenderToJson data={jsonContent} />
            )}
          </div>
        </Link>

        <div className="m-3 flex items-center gap-x-5">
          <div className="flex items-center gap-x-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground font-medium text-xs">
              {commentAmount} Comentarios
            </p>
          </div>

          <CopyLink id={id} />
        </div>
      </div>
    </Card>
  );
}
