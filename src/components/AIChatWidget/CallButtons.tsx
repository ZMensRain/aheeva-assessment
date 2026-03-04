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
        className={`flex-2  rounded-2xl  transition cursor-pointer flex flex-row justify-center items-center gap-2 hover:opacity-90 ${
          isStartCall ? "bg-black" : "bg-red-600 "
        }`}
        onClick={() => onCallButton(isStartCall)}
      >
        <PhoneIcon />
        {!isStartCall ? "End Call" : "Start Call"}
      </button>
      <button
        className={`${
          muted ? "bg-accent " : "bg-red-600 "
        } rounded-2xl flex flex-row justify-center items-center p-2  gap-2 flex-1 cursor-pointer hover:opacity-90`}
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
    </div>
  );
}
