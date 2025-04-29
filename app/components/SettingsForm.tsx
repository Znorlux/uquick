"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { updateUsername } from "../actions";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Settings } from "lucide-react";

const initialState = {
  message: "",
  status: "",
};

export function SettingsForm({
  username,
}: {
  readonly username: string | null | undefined;
}) {
  const [state, formAction] = useFormState(updateUsername, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  return (
    <form action={formAction}>
      <div className="flex">
        <Settings size={24} className="mt-[0.4rem] mr-2" />
        <h1 className="text-3xl font-extrabold tracking-tight">
          Configuración
        </h1>
      </div>

      <Separator className="my-4" />
      <Label className="text-lg">Nombre de usuario</Label>
      <p className="text-muted-foreground">
        En este campo puedes cambiar tu nombre de usuario. Sé creativo y único.
        😉
      </p>

      <Input
        defaultValue={username ?? undefined}
        name="username"
        required
        className="mt-2"
        min={2}
        maxLength={21}
      />

      {state?.status === "error" && (
        <p className="text-destructive mt-1">{state.message}</p>
      )}

      <div className="w-full flex mt-5 gap-x-5 justify-end">
        <Button variant="secondary" asChild type="button">
          <Link href="/">Cancelar</Link>
        </Button>
        <SubmitButton text="Cambiar nombre de usuario" />
      </div>
    </form>
  );
}
