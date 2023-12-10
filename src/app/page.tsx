import FileUpload from "@/components/FileUpload";
import SubscriptionButton from "@/components/SubscriptionButton";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/schema";
import { checkSubscription } from "@/lib/stripe";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className=" h-full grid place-items-center">
      <div className=" flex flex-col gap-4 text-center">
        <span className=" items-center justify-center text-2xl font-bold flex gap-4">
          AI-Powered ChatPDF
          <UserButton afterSignOutUrl="/" />
        </span>
        <span className=" text-muted-foreground w-[500px]">
          Experience PDF interaction, leveraging OpenAI, Pinecone, and Vercel AI
          to extract questions from PDFs and provide intelligent answers.
        </span>
        {isAuth ? (
          <div className=" flex flex-col gap-4">
            <div className=" flex gap-4 items-center justify-center">
              {firstChat ? (
                <Link className="self-center" href={`/chats/${firstChat?.id}`}>
                  <Button className="w-fit flex gap-2 items-center justify-center font-bold">
                    Chats
                  </Button>
                </Link>
              ) : null}

              <SubscriptionButton isPro={isPro} />
            </div>
            <FileUpload />
          </div>
        ) : (
          <Link className="self-center" href={"/sign-in"}>
            <Button className="w-fit flex gap-2 items-center justify-center font-bold">
              Login
              <LogIn />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
