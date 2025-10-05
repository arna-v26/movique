import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Globe, DollarSign } from "lucide-react";

const themes = [
  { id: "default", name: "Default" },
  { id: "deuteranopia", name: "Deuteranopia" },
  { id: "protanopia", name: "Protanopia" },
  { id: "tritanopia", name: "Tritanopia" },
  { id: "inverted", name: "Inverted Colors" },
  { id: "high-contrast", name: "High Contrast" },
  { id: "warm", name: "Warm Mode" },
  { id: "cool", name: "Cool Mode" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "hi", name: "हिन्दी" },
  { code: "ko", name: "한국어" },
];

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

export const AccessibilityControls = () => {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [currentCurrency, setCurrentCurrency] = useState("USD");

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex gap-2">
      {/* Theme Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30 hover:bg-card"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <Palette className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Color Mode</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={currentTheme === theme.id ? "bg-primary/20" : ""}
            >
              {theme.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30 hover:bg-card"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setCurrentLanguage(lang.code)}
              className={currentLanguage === lang.code ? "bg-primary/20" : ""}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Currency Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30 hover:bg-card"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <DollarSign className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Currency</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currencies.map((curr) => (
            <DropdownMenuItem
              key={curr.code}
              onClick={() => setCurrentCurrency(curr.code)}
              className={currentCurrency === curr.code ? "bg-primary/20" : ""}
            >
              {curr.symbol} {curr.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
