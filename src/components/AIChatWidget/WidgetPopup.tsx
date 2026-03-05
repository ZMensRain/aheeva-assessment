type Props = {
  children: React.ReactNode;
  mode?: "call" | "message";
};

export default function WidgetPopup({ children, mode }: Props) {
  return (
    <div
      className={`
        fixed bottom-30 right-1 left-1 h-[calc(90vh-var(--spacing)*30)]
        md:left-[unset] md:right-4  md:max-w-100 md:w-full bg-card
        text-card-foreground p-4 rounded-xl flex flex-col border  shadow-md 
        border-border ${mode === undefined && "hidden"}`}
    >
      {children}
    </div>
  );
}
