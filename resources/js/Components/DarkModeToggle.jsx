import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (import.meta.env.SSR) {
            return undefined;
        }
        if (
            typeof localStorage !== "undefined" &&
            localStorage.getItem("theme")
        ) {
            document.documentElement.classList.remove("dark");
            return localStorage.getItem("theme");
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    });
    const toggleTheme = () => {
        const t = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", t);
        setTheme(t);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.remove("dark");
        } else {
            root.classList.add("dark");
        }
    }, [theme]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? (
        <div className="flex items-center justify-center">
            <button
                onClick={toggleTheme}
                type="button"
                className="hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none duration-100"
            >
                {theme === "light" ? (
                    <SunIcon className="w-6" />
                ) : (
                    <MoonIcon className="w-6" />
                )}
            </button>
        </div>
    ) : null;
}
