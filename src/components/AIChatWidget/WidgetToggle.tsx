import { MessageCircleIcon, PhoneIcon } from "lucide-react";

type Props = {
  mode?: "call" | "message";
  onModeChange?: (mode: "call" | "message") => void;
  onClose?: () => void;
};

export default function WidgetToggle(props: Props) {
  const sharedClass =
    "border p-2 pt-1.5 pb-1.5 flex-1 flex flex-row gap-2 border-border cursor-pointer hover:bg-border";
  return (
    <div className="flex fixed right-4 bottom-4 flex-col gap-2 p-2 w-full rounded-2xl border drop-shadow-md text-card-foreground bg-card border-border max-w-60">
      <span>Speak to an Agent</span>
      <div className="flex flex-row">
        <button
          className={`rounded-bl-xl rounded-tl-xl ${sharedClass} ${
            props.mode === "call" && "bg-muted"
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
            props.mode === "message" && "bg-border"
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
