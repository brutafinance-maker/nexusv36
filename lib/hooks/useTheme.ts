import { useEffect, useState } from "react";

type Theme = "light" | "dark";

let globalTheme: Theme = "light";
const listeners = new Set<(theme: Theme) => void>();

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(globalTheme);

  const setTheme = (newTheme: Theme) => {
    globalTheme = newTheme;
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    listeners.forEach((l) => l(newTheme));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemDark ? "dark" : "light");
    }

    const handleChange = (newTheme: Theme) => setThemeState(newTheme);
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}
