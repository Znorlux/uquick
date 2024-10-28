"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./SubmitButtons";
import { createComment } from "../actions";
import { useRef } from "react";

interface iAppPorps {
  postId: string;
}

export function CommentForm({ postId }: iAppPorps) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      className="mt-5"
      action={async (formData) => {
        await createComment(formData);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <input type="hidden" name="postId" value={postId} />
      <Label>Comentarios por aquí</Label>
      <Textarea
        placeholder="¿Que opinas de esta publicación?"
        className="w-full mt-1 mb-2"
        name="comment"
      />
      <SubmitButton text="Comentar" />
    </form>
  );
}
