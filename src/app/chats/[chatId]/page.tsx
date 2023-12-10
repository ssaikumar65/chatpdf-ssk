import AIChat from "@/components/AIChat";
import PDFViewer from "@/components/PDFViewer";
import Sidebar from "@/components/Sidebar";
import { db } from "@/lib/db";
import { chats } from "@/lib/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};
const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  if (!currentChat) {
    return redirect("/");
  }

  return (
    <div className=" flex h-full min-w-[1200px]">
      <div className="flex-[2] max-w-xs overflow-hidden">
        <Sidebar chats={_chats} chatId={parseInt(chatId)} />
      </div>
      <div className="flex-[5]">
        <PDFViewer pdf_url={currentChat.pdfUrl || ""} />
      </div>
      <div className="flex-[3]">
        <AIChat chatId={parseInt(chatId)} />
      </div>
    </div>
  );
};
export default ChatPage;
