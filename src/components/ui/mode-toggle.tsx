import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const [theme, setThemeState] = React.useState<"theme-light" | "dark">("theme-light")

    React.useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark")
        setThemeState(isDarkMode ? "dark" : "theme-light")
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "theme-light" : "dark"
        setThemeState(newTheme)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:absolute dark:opacity-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all opacity-0 dark:opacity-100 dark:relative" />
        </Button>
    )
}
