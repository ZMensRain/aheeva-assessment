import type { Message } from "../../models/message";
import { WidgetMessage } from "./WidgetMessage";

type Props = {
  messages: Message[];
  agentTyping: boolean;
};

export default function WidgetMessageContainer({
  messages,
  agentTyping,
}: Props) {
  return (
    <div className="flex-1 overflow-y-scroll">
      {messages.map((message) => (
        <WidgetMessage message={message} key={message.content} />
      ))}
      {agentTyping && (
        <div className="text-left text-gray-400 select-none">Typing...</div>
      )}
    </div>
  );
}
