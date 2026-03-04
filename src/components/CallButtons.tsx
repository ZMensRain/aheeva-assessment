import { MicIcon, MicOffIcon, PhoneIcon } from "lucide-react";

type Props = {
  muted: boolean;
  onMuteToggle: () => void;
  onCallButton: (isStartCall?: boolean) => void;
  isStartCall?: boolean;
};

export default function CallButtons({
  muted,
  onMuteToggle,
  onCallButton,
  isStartCall,
}: Props) {
  return (
    <div className="flex flex-row gap-2">
      <button
        className={`${
          muted ? "bg-accent hover:bg-amber-600" : "bg-red-500 hover:bg-red-600"
        } rounded-2xl flex flex-row justify-center items-center p-2  gap-2 flex-1 cursor-pointer`}
        onClick={onMuteToggle}
      >
        {muted ? (
          <>
            <MicOffIcon /> Unmute
          </>
        ) : (
          <>
            <MicIcon /> Mute
          </>
        )}
      </button>
      <button
        className={`flex-2  rounded-2xl  transition cursor-pointer flex flex-row justify-center items-center gap-2 ${
          isStartCall
            ? "bg-accent hover:bg-amber-600"
            : "bg-red-500 p-2 hover:bg-red-600"
        }`}
        onClick={() => onCallButton(isStartCall)}
      >
        <PhoneIcon />
        {!isStartCall ? "End Call" : "Start Call"}
      </button>
    </div>
  );
}
