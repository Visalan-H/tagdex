// Light or dark theme. With no saved choice the system setting decides;
// pressing the button saves an explicit choice in localStorage.
// The inline script in BaseLayout applies the theme before first paint.

const STORAGE_KEY = "theme";
const THEME_COLORS = { light: "#f2f3f5", dark: "#17171c" } as const;
type Theme = keyof typeof THEME_COLORS;

const systemQuery = matchMedia("(prefers-color-scheme: dark)");

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => button.setAttribute("aria-label", label));
}

export function initThemeToggle() {
  apply(currentTheme());

  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) =>
    button.addEventListener("click", () => {
      const next: Theme = currentTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private mode or blocked storage: the switch still works for this visit.
      }
      const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (document.startViewTransition && !reduceMotion) {
        document.startViewTransition(() => apply(next));
      } else {
        apply(next);
      }
    }),
  );

  // Follow the system live until the visitor picks a theme.
  systemQuery.addEventListener("change", (event) => {
    if (!savedTheme()) apply(event.matches ? "dark" : "light");
  });
}
