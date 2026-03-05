import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

export default function ThemeToggle() {
  const [darkTheme, setTheme] = useState(() =>
    document.documentElement.classList.toggle("dark")
  );

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setTheme((prev) => !prev);
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 fixed top-4 left-4 cursor-pointer"
      aria-label="Theme Toggle"
    >
      {darkTheme ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
