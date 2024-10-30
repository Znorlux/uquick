import React from "react";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const Messages = ({ messages, isLoading }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((m, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            m.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`p-2 rounded-full shadow-sm ${
              m.role === "user"
                ? "bg-orange-400 text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            {m.role === "user" ? (
              <User2 className="w-5 h-5" />
            ) : (
              <Bot
                className={`w-5 h-5 ${
                  isLoading && index === messages.length - 1
                    ? "animate-bounce"
                    : ""
                }`}
              />
            )}
          </div>
          <div
            className={`relative p-4 rounded-2xl max-w-[80%] ${
              m.role === "user"
                ? "bg-orange-300 text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="prose prose-sm">{m.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
