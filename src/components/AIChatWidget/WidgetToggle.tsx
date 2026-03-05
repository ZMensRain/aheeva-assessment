import { MessageCircleIcon, PhoneIcon } from "lucide-react";

type Props = {
  mode?: "call" | "message";
  onModeChange?: (mode: "call" | "message") => void;
  onClose?: () => void;
};

export default function WidgetToggle(props: Props) {
  const sharedClass =
    "border p-2 pt-1.5 pb-1.5 flex-1 flex flex-row gap-2 border-gray-300 dark:border-stone-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-stone-600";
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 bg-white dark:bg-stone-800 p-2 rounded-2xl text-black dark:text-white max-w-60 w-full border border-gray-300 dark:border-stone-700 drop-shadow-md">
      <span>Speak to an Agent</span>
      <div className="flex flex-row">
        <button
          className={`rounded-bl-xl rounded-tl-xl ${sharedClass} ${
            props.mode === "call" && "bg-gray-200 dark:bg-stone-700"
          }`}
          onClick={() =>
            props.mode === "call"
              ? props.onClose?.()
              : props.onModeChange?.("call")
          }
        >
          <PhoneIcon />
          Call
        </button>
        <button
          className={`rounded-br-xl rounded-tr-xl ${sharedClass} ${
            props.mode === "message" && "bg-gray-200 dark:bg-stone-700"
          }`}
          onClick={() =>
            props.mode === "message"
              ? props.onClose?.()
              : props.onModeChange?.("message")
          }
        >
          <MessageCircleIcon />
          Message
        </button>
      </div>
    </div>
  );
}
