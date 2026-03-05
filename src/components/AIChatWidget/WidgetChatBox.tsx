import { SendIcon } from "lucide-react";
import React from "react";

type Props = {
  onMessageSend?: (message: string) => void;
};

export default function WidgetChatBox({ onMessageSend }: Props) {
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
      className="flex flex-col gap-1 text-left group"
    >
      <label
        className="mb-1 text-left transition group-focus-within:text-primary group-focus-within:font-semibold"
        htmlFor="aheeva-chat-input"
      >
        Message
      </label>

      <div className="flex flex-row flex-1 items-center pr-2 rounded-xl border-2 transition border-border group-focus-within:border-primary">
        <textarea
          id="aheeva-chat-input"
          className="p-4 w-full rounded-xl border-none resize-none outline-0"
          placeholder="What does the company do?"
          name="message"
          required
        ></textarea>

        <button
          className="p-2 rounded-xl transition cursor-pointer bg-primary text-primary-foreground hover:opacity-90"
          type="submit"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
}
