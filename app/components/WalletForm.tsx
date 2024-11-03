"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateWalletAddress } from "../actions";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";

const initialState = {
  message: "",
  status: "",
};

export default function WalletForm({
  currentWallet,
}: {
  currentWallet: string | null;
}) {
  const [state, formAction] = useFormState(updateWalletAddress, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Successful",
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
        <Wallet size={24} className="mt-[0.4rem] mr-2" />
        <h1 className="text-3xl font-extrabold tracking-tight">
          {currentWallet ? "Actualizar Wallet" : "Añadir Wallet"}
        </h1>
      </div>

      <Separator className="my-4" />
      <div className="flex">
        <Label className="text-lg">Dirección de Wallet de blockchain</Label>
        <AvalanceIcon />
      </div>
      <p className="text-muted-foreground">
        {currentWallet
          ? "Puedes actualizar tu dirección de wallet. Recuerda que debe ser una wallet de Avalanche o Ethereum."
          : "Ingresa tu dirección de wallet para asociarla con tu cuenta. Recuerda que debe ser una wallet de Avalanche o Ethereum."}
      </p>

      <Input
        name="walletAddress"
        defaultValue={currentWallet ?? ""}
        required
        className="mt-2"
        minLength={42}
        maxLength={42}
        placeholder="0x..."
      />

      {state?.status === "error" && (
        <p className="text-destructive mt-1">{state.message}</p>
      )}

      <div className="w-full flex mt-5 gap-x-5 justify-end">
        <SubmitButton
          text={currentWallet ? "Actualizar Wallet" : "Guardar Wallet"}
        />
      </div>
    </form>
  );
}

const AvalanceIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      className="mt-[0.2rem] ml-2"
    >
      <g fill="none" fillRule="evenodd">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M15.638 8.699a1.5 1.5 0 0 0 0-1.5l-2.224-3.852a1.5 1.5 0 0 0-2.598 0L2.182 18.3a1.5 1.5 0 0 0 1.299 2.25h4.448a1.5 1.5 0 0 0 1.3-.75zm5.11 11.852a1.5 1.5 0 0 0 1.3-2.25l-3.134-5.428a1.5 1.5 0 0 0-2.598 0l-3.134 5.428a1.5 1.5 0 0 0 1.299 2.25h6.268Z"
        />
      </g>
    </svg>
  );
};
