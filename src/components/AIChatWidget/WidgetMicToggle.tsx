import { MicIcon, MicOffIcon } from "lucide-react";

type Props = {
  muted: boolean;
  onToggle: () => void;
};

export default function WidgetMicToggle({
  muted,
  onToggle: onMuteToggle,
}: Props) {
  return (
    <div className="absolute top-4 right-4">
      <button
        className={`rounded-xl p-1.5 cursor-pointer hover:opacity-90 border text-inherit border-gray-300 dark:border-stone-700`}
        onClick={onMuteToggle}
        aria-label={muted ? "Unmute microphone" : "Mute microphone"}
      >
        {muted ? <MicOffIcon /> : <MicIcon />}
      </button>
    </div>
  );
}
