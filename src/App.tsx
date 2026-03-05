import { AIChatWidget } from "./components/AIChatWidget/";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <main className="bg-white dark:bg-stone-900 text-black dark:text-white h-svh text-center flex flex-col items-center justify-center">
      <ThemeToggle />
      <h1 className="text-4xl font-bold mb-5">Aheeva AI Widget Assessment</h1>

      <AIChatWidget />
    </main>
  );
}

export default App;
