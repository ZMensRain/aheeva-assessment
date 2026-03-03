type Props = {
  open?: boolean;
};

import { BotMessageSquare } from "lucide-react";
import { useState } from "react";
import ChatBox from "./ChatBox";

export default function AIChatWidget(props: Props) {
  const [dialogOpen, setDialogOpen] = useState(props.open ?? false);

  function handleClick() {
    setDialogOpen(!dialogOpen);
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
        <div className="fixed right-4 bottom-20 max-w-100 w-full min-h-150 bg-gray-800 p-4 rounded-xl flex flex-col shadow-2xl">
          <h2 className="text-2xl font-bold">Aheeva AI Chat</h2>

          <div className="flex-1"></div>
          <ChatBox onMessageSend={(message) => console.log(message)} />
        </div>
      )}
    </>
  );
}
