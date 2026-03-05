import type { Status } from "@elevenlabs/react";

type Props = {
  status: Status;
  loading: boolean;
};

export default function StatusIndicator({ status, loading }: Props) {
  const backgroundColor = loading
    ? "bg-amber-500"
    : status == "connected"
    ? "bg-green-500"
    : "bg-red-500";

  return (
    <span className="flex items-center gap-1">
      <span
        className={`rounded-full p-2 text-xs font-bold ${backgroundColor}`}
      ></span>
      {loading ? "Loading..." : status == "connected" ? "Listening" : "Offline"}
    </span>
  );
}
