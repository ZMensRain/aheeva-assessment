import { useRef } from "react";
import { AIChatWidget, type AIChatHandles } from "./components/AIChatWidget/";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const ref = useRef<AIChatHandles>(null);

  return (
    <main className="bg-white dark:bg-stone-900 text-black dark:text-white h-svh text-center flex flex-col items-center justify-center">
      <ThemeToggle />
      <h1 className="text-4xl font-bold mb-5">Aheeva AI Widget Assessment</h1>
      <button
        className="bg-accent text-black font-semibold p-2.5 rounded-xl hover:opacity-90 transition cursor-pointer"
        onClick={() => ref.current?.open("message")}
      >
        Talk to us
      </button>
      <AIChatWidget ref={ref} />
    </main>
  );
}

export default App;
