import { useRef } from "react";
import { AIChatWidget, type AIChatHandles } from "./components/AIChatWidget/";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const ref = useRef<AIChatHandles>(null);

  return (
    <main className="flex flex-col justify-center items-center text-center h-svh">
      <ThemeToggle />
      <h1 className="mb-5 text-4xl font-bold">Aheeva AI Widget Assessment</h1>
      <button
        className="bg-primary text-primary-foreground font-semibold p-2.5 rounded-xl hover:opacity-90 transition cursor-pointer"
        onClick={() => ref.current?.open("message")}
      >
        Talk to us
      </button>
      <AIChatWidget ref={ref} />
    </main>
  );
}

export default App;
