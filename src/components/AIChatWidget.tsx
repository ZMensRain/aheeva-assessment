type Props = {
  open?: boolean;
};

import { BotMessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBox from "./ChatBox";
import MessageContainer from "./MessageContainer";
import type { Message } from "../models/message";
import { useConversation, type Status } from "@elevenlabs/react";
import CallButtons from "./CallButtons";

async function isTextOnly(): Promise<boolean> {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return false;
  } catch (error) {
    console.log("Error accessing microphone:", error);
    return true;
  }
}

export default function AIChatWidget(props: Props) {
  const [dialogOpen, setDialogOpen] = useState(props.open ?? false);
  const [textOnly, setTextOnly] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [micMuted, setMicMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const conversation = useConversation({
    micMuted: micMuted,
    onError: (error) => {
      console.error(error);
      setIsLoading(false);
    },
    onConnect: () => setIsLoading(false),
    onDisconnect: () => setIsLoading(false),

    onMessage: (message) => {
      setMessages((prev) => {
        console.log(message);

        return [...prev, { content: message.message, role: message.role }];
      });
      console.log(message);
    },
  });

  async function handleStartConversation() {
    setMessages([]);
    const textOnly = await isTextOnly();
    setTextOnly(textOnly);
    conversation.startSession({
      agentId: "agent_6201kjsythxdedabv86f4td7ej9p",
      textOnly: textOnly,
      connectionType: "websocket",
    });
  }

  async function handleClick() {
    setDialogOpen(!dialogOpen);
    await handleStartConversation();
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
          <StatusIndicator status={conversation.status} loading={isLoading} />
          <h2 className="text-2xl font-bold mb-2">Aheeva AI Chat</h2>
          <MessageContainer messages={messages} />
          {textOnly && (
            <ChatBox
              onMessageSend={(message) => {
                conversation.sendUserMessage(message);
                setMessages((prev) => [
                  ...prev,
                  { content: message, role: "user" },
                ]);
              }}
            />
          )}
          {!textOnly && (
            <CallButtons
              muted={conversation.micMuted ?? false}
              onMuteToggle={() => setMicMuted((prev) => !prev)}
              onCallButton={(isStartCall) => {
                if (isStartCall) handleStartConversation();
                else conversation.endSession();
              }}
              isStartCall={conversation.status == "disconnected"}
            />
          )}
          <span className="text-xs text-gray-400 mt-2">
            Powered by{" "}
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              ElevenLabs
            </a>
          </span>
        </div>
      )}
    </>
  );
}

function StatusIndicator({
  status,
  loading,
}: {
  status: Status;
  loading: boolean;
}) {
  return (
    <span className="flex items-center gap-1">
      <span
        className={`rounded-full p-2 text-xs font-bold ${
          loading
            ? "bg-amber-500"
            : status == "connected"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      ></span>
      {loading ? "Loading..." : status == "connected" ? "Online" : "Offline"}
    </span>
  );
}
