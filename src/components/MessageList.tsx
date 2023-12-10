import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

type Props = {
  messages: Message[];
  isLoading: boolean;
  error: Error | undefined;
};

const MessageList = ({ messages, isLoading, error }: Props) => {
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const isUserLastMessage =
    messages &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  if (!messages) return <></>;

  return (
    <ul
      ref={scrollRef}
      className=" flex h-full flex-col gap-5 overflow-hidden overflow-y-scroll rounded-lg bg-foreground/20 p-3 transition-all"
    >
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))
      ) : (
        <span className=" grid h-full w-full place-items-center">
          Ask AI anything from the PDF
        </span>
      )}
      {isLoading && isUserLastMessage ? (
        <MessageItem message={{ role: "assistant", content: "Thinking..." }} />
      ) : null}
      {error ? (
        <MessageItem
          message={{
            role: "assistant",
            content: "Something went wrong.",
          }}
        />
      ) : null}
    </ul>
  );
};
export default MessageList;
