"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TChat } from "@/lib/schema";

type Props = {
  chats: TChat[];
  chatId: number;
};

const Sidebar = ({ chats, chatId }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex gap-4 flex-col w-full h-full p-4">
      <Link href="/">
        <Button
          variant={"outline"}
          className="w-full font-bold border-dashed border-white border-2"
        >
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>
      <span className=" text-muted-foreground font-bold">Chats</span>

      <div className="h-full ">
        <div className="flex h-full flex-col gap-2 overflow-y-scroll ">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chats/${chat.id}`}>
              <div
                className={cn("rounded-lg p-3 bg-slate-700 flex items-center", {
                  "bg-slate-500": chat.id === chatId,
                  "hover:bg-slate-500": chat.id !== chatId,
                })}
              >
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
