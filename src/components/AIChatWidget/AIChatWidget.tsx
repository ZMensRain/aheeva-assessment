import { useState } from "react";
import ChatBox from "./ChatBox";
import MessageContainer from "./MessageContainer";
import type { Message } from "../../models/message";
import { useConversation } from "@elevenlabs/react";
import MuteMicButton from "./MuteMicButton";
import PoweredBy from "./PoweredBy";
import StatusIndicator from "./StatusIndicator";
import WidgetToggle from "./WidgetToggle";

async function isTextOnly(): Promise<boolean> {
  console.log("checking if text only");
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return false;
  } catch (error) {
    console.log("Error accessing microphone:", error);
    return true;
  }
}

type AIChatState = {
  mode?: "call" | "message";
  messages: Message[];
  micMuted: boolean;
  isLoading: boolean;
  isAgentTyping: boolean;
  error: string | undefined;
};

export default function AIChatWidget() {
  const [state, setState] = useState<AIChatState>({
    mode: undefined,
    messages: [],
    micMuted: false,
    isLoading: true,
    isAgentTyping: true,
    error: undefined,
  });

  const textOnly = state.mode !== "call";

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

  async function handleStartConversation(textOnly?: boolean) {
    setState((prev) => ({
      ...prev,
      messages: [],
      error: undefined,
      isLoading: true,
    }));

    if (!textOnly) textOnly = await isTextOnly();
    if (textOnly) setState((prev) => ({ ...prev, mode: "message" }));

    conversation.startSession({
      agentId: "agent_6201kjsythxdedabv86f4td7ej9p",
      connectionType: "websocket",
      textOnly: textOnly,
    });
  }

  function handleToggleMute() {
    setState((prev) => ({ ...prev, micMuted: !prev.micMuted }));
  }

  function handleMessageSend(message: string) {
    conversation.sendUserMessage(message);
    setState((prev) => ({
      ...prev,
      isAgentTyping: true,
      messages: [...prev.messages, { content: message, role: "user" }],
    }));
  }

  function handleModeChange(mode: "call" | "message") {
    setState((prev) => {
      // prevents prompting for microphone access when not needed
      if (mode === "message") handleStartConversation(true);
      else conversation.endSession().then(() => handleStartConversation(false));

      return { ...prev, mode: mode };
    });
  }

  function handleClose() {
    setState((prev) => ({ ...prev, mode: undefined }));
    conversation.endSession();
  }

  return (
    <>
      <WidgetToggle
        mode={state.mode}
        onModeChange={handleModeChange}
        onClose={handleClose}
      />
      {state.mode !== undefined && (
        <div className="fixed bottom-30 right-1 left-1 h-[calc(90vh-var(--spacing)*30)]  md:left-[unset] md:right-4  md:max-w-100 md:w-full  bg-gray-100 dark:bg-stone-800 text-black dark:text-white p-4 rounded-xl flex flex-col shadow-md border border-gray-300 dark:border-stone-700">
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
            agentTyping={textOnly && state.isAgentTyping}
          />
          <ChatBox onMessageSend={handleMessageSend} />
          {!textOnly && (
            <MuteMicButton
              muted={conversation.micMuted ?? false}
              onMuteToggle={handleToggleMute}
            />
          )}
          <PoweredBy />
        </div>
      )}
    </>
  );
}
