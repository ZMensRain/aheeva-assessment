import Markdown from "react-markdown";
import type { Message } from "../models/message";

export function MessageComponent({ message }: { message: Message }) {
  return (
    <div
      className={` p-4 rounded-xl flex flex-col mb-4 text-left ${
        message.role == "user" ? "ml-10 bg-gray-700 shadow-2xl" : "mr-10"
      }`}
    >
      <Markdown>{message.content}</Markdown>
    </div>
  );
}
