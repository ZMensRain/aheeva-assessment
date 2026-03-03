import type { Message } from "../models/message";
import { MessageComponent } from "./MessageComponent";

type Props = {
  messages: Message[];
};

export default function MessageContainer({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-scroll">
      {messages.map((message) => (
        <MessageComponent message={message} />
      ))}
    </div>
  );
}
