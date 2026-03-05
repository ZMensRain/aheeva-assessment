import type { Message } from "../../models/message";
import { MessageComponent } from "./MessageComponent";

type Props = {
  messages: Message[];
  agentTyping: boolean;
};

export default function MessageContainer({ messages, agentTyping }: Props) {
  return (
    <div className="flex-1 overflow-y-scroll">
      {messages.map((message) => (
        <MessageComponent message={message} key={message.content} />
      ))}
      {agentTyping && (
        <div className="text-left text-gray-400 select-none">Typing...</div>
      )}
    </div>
  );
}
