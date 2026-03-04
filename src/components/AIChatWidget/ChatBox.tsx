import { SendIcon } from "lucide-react";
import React from "react";

type Props = {
  onMessageSend?: (message: string) => void;
};

export default function ChatBox({ onMessageSend }: Props) {
  // input reference

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formDate = new FormData(e.target as HTMLFormElement);
    const message = formDate.get("message") as string;

    if (!message) {
      alert("Please enter a message");
      return;
    }
    (e.target as HTMLFormElement).reset();
    onMessageSend?.(message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group text-left flex flex-col gap-1"
    >
      <label
        className="text-white text-left mb-1 group-focus-within:text-accent group-focus-within:font-semibold transition"
        htmlFor="aheeva-chat-input"
      >
        Message
      </label>

      <div className="flex-1 border-2 border-gray-700 rounded-xl flex flex-row items-center pr-2 group-focus-within:border-accent  transition">
        <textarea
          id="aheeva-chat-input"
          className=" text-white p-4 border-none outline-0 rounded-xl w-full resize-none"
          placeholder="What does the company do?"
          name="message"
          required
        ></textarea>

        <button
          className="bg-accent p-2 rounded-xl hover:opacity-90 transition cursor-pointer"
          type="submit"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
}
