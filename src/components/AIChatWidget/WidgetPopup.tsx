type Props = {
  children: React.ReactNode;
  mode?: "call" | "message";
};

export default function WidgetPopup({ children, mode }: Props) {
  return (
    <div
      className={`fixed bottom-30 right-1 left-1 h-[calc(90vh-var(--spacing)*30)]
        md:left-[unset] md:right-4  md:max-w-100 md:w-full  bg-gray-100 dark:bg-stone-800
        text-black dark:text-white p-4 rounded-xl flex flex-col shadow-md border 
        border-gray-300 dark:border-stone-700 ${
          mode === undefined && "hidden"
        }`}
    >
      {children}
    </div>
  );
}
