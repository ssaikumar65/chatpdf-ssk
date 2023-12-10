"use client";
import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import MessageList from "./MessageList";
import { Message, useChat } from "ai/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Props = {
  chatId: number;
};
const AIChat = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages, error } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });
  return (
    <div className="p-4 flex flex-col justify-between gap-4 h-full">
      <span className="text-xl font-bold">AI Chat</span>

      <MessageList messages={messages} error={error} isLoading={isLoading} />

      <form onSubmit={handleSubmit} className=" flex gap-2 py-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
          className="w-full"
        />
        <Button size={"icon"}>
          <SendHorizontal />
        </Button>
      </form>
    </div>
  );
};
export default AIChat;
