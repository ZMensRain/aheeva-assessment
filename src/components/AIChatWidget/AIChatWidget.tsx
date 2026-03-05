import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import WidgetChatBox from "./WidgetChatBox";
import WidgetMessageContainer from "./WidgetMessageContainer";
import type { Message } from "../../models/message";
import { useConversation } from "@elevenlabs/react";
import WidgetMicToggle from "./WidgetMicToggle";
import WidgetPoweredBy from "./WidgetPoweredBy";
import WidgetStatusIndicator from "./WidgetStatus";
import WidgetToggle from "./WidgetToggle";
import WidgetPopup from "./WidgetPopup";
import { isTextOnly } from "../../utils/IsTextOnly";

type mode = "call" | "message";
type AIChatState = {
  mode?: mode;
  messages: Message[];
  micMuted: boolean;
  isLoading: boolean;
  isAgentTyping: boolean;
  error: string | undefined;
};

export type AIChatHandles = {
  open: (mode: mode) => void;
  close: () => void;
};

export const AIChatWidget = forwardRef<AIChatHandles, object>((_props, ref) => {
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

  const handleStartConversation = useCallback(
    async (textOnly?: boolean) => {
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
    },
    [conversation]
  );

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

  const handleModeChange = useCallback(
    (mode: mode) => {
      setState((prev) => {
        // prevents prompting for microphone access when not needed
        if (mode === "message") handleStartConversation(true);
        else
          conversation.endSession().then(() => handleStartConversation(false));

        return { ...prev, mode: mode };
      });
    },
    [conversation, handleStartConversation]
  );

  const handleClose = useCallback(() => {
    setState((prev) => ({ ...prev, mode: undefined }));
    conversation.endSession();
  }, [conversation]);

  useImperativeHandle(
    ref,
    () => ({
      open: (mode: mode) => handleModeChange(mode),
      close: () => handleClose(),
    }),
    [handleClose, handleModeChange]
  );

  return (
    <>
      <WidgetToggle
        mode={state.mode}
        onModeChange={handleModeChange}
        onClose={handleClose}
      />
      <WidgetPopup mode={state.mode}>
        <WidgetStatusIndicator
          status={conversation.status}
          loading={state.isLoading}
        />
        <h2 className="text-2xl font-bold mb-2">Aheeva AI Chat</h2>
        {state.error && (
          <div className="text-red-500 text-center">
            <p>{state.error}</p>
          </div>
        )}
        <WidgetMessageContainer
          messages={state.messages}
          agentTyping={textOnly && state.isAgentTyping}
        />
        <WidgetChatBox onMessageSend={handleMessageSend} />
        {!textOnly && (
          <WidgetMicToggle
            muted={conversation.micMuted ?? false}
            onToggle={handleToggleMute}
          />
        )}
        <WidgetPoweredBy />
      </WidgetPopup>
    </>
  );
});
