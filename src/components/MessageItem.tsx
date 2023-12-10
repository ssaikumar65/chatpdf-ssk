import { cn } from "@/lib/utils";
import { Message } from "ai";

const MessageItem = ({
  message,
}: {
  message: Pick<Message, "role" | "content">;
}) => {
  const isAIMessage = message.role !== "user";

  return (
    <li
      className={cn(
        "flex w-full items-center gap-1 px-2",
        !isAIMessage && "flex-row-reverse justify-start"
      )}
    >
      <div
        className={cn(
          "flex w-fit min-w-[80px] max-w-xs items-center overflow-hidden rounded-lg p-2",
          isAIMessage
            ? "bg-background text-foreground"
            : "bg-foreground text-background"
        )}
      >
        <p className="whitespace-pre-line break-words">{message.content}</p>
      </div>
    </li>
  );
};
export default MessageItem;
