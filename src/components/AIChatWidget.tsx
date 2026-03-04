type Props = {
  open?: boolean;
};

import { BotMessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBox from "./ChatBox";
import MessageContainer from "./MessageContainer";
import type { Message } from "../models/message";
import { useConversation, type Status } from "@elevenlabs/react";

export default function AIChatWidget(props: Props) {
  const [dialogOpen, setDialogOpen] = useState(props.open ?? false);

  const [messages, setMessages] = useState<Message[]>([]);

  const conversation = useConversation({
    onError: (error) => {
      console.error(error);
    },

    onMessage: (message) => {
      setMessages((prev) => [
        ...prev,
        { content: message.message, role: "assistant" },
      ]);
      console.log(message);
    },
  });

  function handleClick() {
    conversation.startSession({
      agentId: "agent_6201kjsythxdedabv86f4td7ej9p",
      textOnly: true,

      connectionType: "websocket",
    });

    setDialogOpen(!dialogOpen);
  }

  return (
    <>
      <button
        className="rounded-xl bg-accent p-4 fixed bottom-4 right-4 cursor-pointer hover:scale-110 transition"
        onClick={handleClick}
        aria-label="Toggle AI chat"
        aria-toggle="true"
        aria-expanded={dialogOpen}
      >
        <BotMessageSquare scale={3} />
      </button>
      {dialogOpen && (
        <div className="fixed right-4 bottom-20 max-w-100 w-full min-h-150 max-h-[50vh] bg-gray-800 p-4 rounded-xl flex flex-col shadow-2xl">
          <StatusIndicator status={conversation.status} />
          <h2 className="text-2xl font-bold mb-2">Aheeva AI Chat</h2>
          <MessageContainer messages={messages} />
          <ChatBox
            onMessageSend={(message) => {
              conversation.sendUserMessage(message);
              setMessages((prev) => [
                ...prev,
                { content: message, role: "user" },
              ]);
            }}
          />
        </div>
      )}
    </>
  );
}

function StatusIndicator({ status }: { status: Status }) {
  return (
    <span className="flex items-center gap-1">
      <span
        className={`rounded-full p-2 text-xs font-bold ${
          status == "connected" ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      {status == "connected" ? "Online" : "Offline"}
    </span>
  );
}
