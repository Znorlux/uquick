"use client";
import { useChat } from "ai/react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Messages from "@/app/components/chatbot/Messages";
import InputForm from "@/app/components/chatbot/InputForm";
import { useEffect, useRef } from "react";

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Encuentra el contenedor scrolleable dentro del ScrollArea
    const scrollContainer = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;

    if (scrollContainer) {
      // Scroll al fondo
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]); // Se ejecuta cada vez que hay nuevos mensajes

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col bg-gradient-to-b from-white to-gray-50 mt-[5vh]">
      <CardContent className="flex flex-col h-full p-6">
        <ScrollArea ref={scrollAreaRef} className="flex-grow mb-6 pr-4">
          <Messages messages={messages} isLoading={isLoading} />
        </ScrollArea>
        <InputForm
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      </CardContent>
    </Card>
  );
}
