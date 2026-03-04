import { BotMessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBox from "./ChatBox";
import MessageContainer from "./MessageContainer";
import type { Message } from "../../models/message";
import { useConversation } from "@elevenlabs/react";
import CallButtons from "./CallButtons";
import PoweredBy from "./PoweredBy";
import StatusIndicator from "./statusIndicator";

async function isTextOnly(): Promise<boolean> {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return false;
  } catch (error) {
    console.log("Error accessing microphone:", error);
    return true;
  }
}

type AIChatState = {
  dialogOpen: boolean;
  textOnly: boolean;
  messages: Message[];
  micMuted: boolean;
  isLoading: boolean;
  isAgentTyping: boolean;
  error: string | undefined;
};

type Props = {
  open?: boolean;
};

export default function AIChatWidget(props: Props) {
  const [state, setState] = useState<AIChatState>({
    dialogOpen: props.open ?? false,
    textOnly: false,
    messages: [],
    micMuted: false,
    isLoading: true,
    isAgentTyping: true,
    error: undefined,
  });

  const conversation = useConversation({
    micMuted: state.micMuted,
    onError: (error) =>
      setState((prev) => ({ ...prev, isLoading: false, error: error })),
    onConnect: () => setState((prev) => ({ ...prev, isLoading: false })),
    onDisconnect: () => setState((prev) => ({ ...prev, isLoading: false })),

    onMessage: (message) => {
      setState((prev) => ({
        ...prev,
        isAgentTyping: false,
        messages: [
          ...prev.messages,
          { content: message.message, role: message.role },
        ],
      }));
    },
  });

  async function handleStartConversation() {
    setState((prev) => ({
      ...prev,
      messages: [],
      error: undefined,
      isLoading: true,
    }));

    const textOnly = await isTextOnly();
    setState((prev) => ({ ...prev, textOnly: textOnly }));

    conversation.startSession({
      agentId: "agent_6201kjsythxdedabv86f4td7ej9p",
      textOnly: textOnly,
      connectionType: "websocket",
    });
  }

  async function handleToggleOpen() {
    setState((prev) => ({ ...prev, dialogOpen: !prev.dialogOpen }));
    if (!state.dialogOpen) await handleStartConversation();
    else conversation.endSession();
  }

  function handleToggleMute() {
    setState((prev) => ({ ...prev, micMuted: !prev.micMuted }));
  }

  function handleCallButton(isStartCall?: boolean) {
    if (isStartCall) handleStartConversation();
    else conversation.endSession();
  }

  function handleMessageSend(message: string) {
    conversation.sendUserMessage(message);
    setState((prev) => ({
      ...prev,
      isAgentTyping: true,
      messages: [...prev.messages, { content: message, role: "user" }],
    }));
  }

  return (
    <>
      <button
        className="rounded-xl bg-accent p-4 fixed bottom-4 right-4 cursor-pointer hover:scale-110 transition"
        onClick={handleToggleOpen}
        aria-label="Toggle AI chat"
        aria-expanded={state.dialogOpen}
      >
        <BotMessageSquare scale={3} />
      </button>
      {state.dialogOpen && (
        <div className="fixed right-4 bottom-20 max-w-100 w-full min-h-150 max-h-[50vh] bg-gray-800 p-4 rounded-xl flex flex-col shadow-2xl">
          <StatusIndicator
            status={conversation.status}
            loading={state.isLoading}
          />
          <h2 className="text-2xl font-bold mb-2">Aheeva AI Chat</h2>
          {state.error && (
            <div className="text-red-500 text-center">
              <p>{state.error}</p>
            </div>
          )}
          <MessageContainer
            messages={state.messages}
            agentTyping={state.textOnly && state.isAgentTyping}
          />
          {state.textOnly && <ChatBox onMessageSend={handleMessageSend} />}
          {!state.textOnly && (
            <CallButtons
              muted={conversation.micMuted ?? false}
              onMuteToggle={handleToggleMute}
              onCallButton={handleCallButton}
              isStartCall={conversation.status == "disconnected"}
            />
          )}
          <PoweredBy />
        </div>
      )}
    </>
  );
}
