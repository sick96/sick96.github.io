import "./style.css";
import { navigation } from "./components/navigation";
import { about, contact, education, experience, footer, hero, projects, skills } from "./components/sections";
import { icon } from "./components/icons";
import { portfolio } from "./data/portfolio";

const app = document.querySelector<HTMLElement>("#app");
if (!app) throw new Error("The page is missing its application root.");
app.innerHTML = `${navigation()}<main>${hero()}${about()}${skills()}${projects()}${experience()}${education()}${contact()}</main>${footer()}`;

const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
const siteNav = document.querySelector<HTMLElement>(".site-nav");
if (!navToggle || !siteNav) throw new Error("The page is missing its navigation controls.");
const setNavigation = (open: boolean): void => {
    siteNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navToggle.innerHTML = icon(open ? "close" : "menu");
};
const closeNavigation = (): void => setNavigation(false);
navToggle.addEventListener("click", () => setNavigation(!siteNav.classList.contains("is-open")));
siteNav.addEventListener("click", (event) => { if ((event.target as HTMLElement).closest("a")) closeNavigation(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeNavigation(); navToggle.focus(); } });

const themeToggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
if (!themeToggle) throw new Error("The page is missing its theme toggle.");
const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const setTheme = (theme: string): void => { document.documentElement.dataset.theme = theme; themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`); };
setTheme(initialTheme);
themeToggle.addEventListener("click", () => { const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; localStorage.setItem("portfolio-theme", next); setTheme(next); });

document.title = `${portfolio.name} | ${portfolio.title}`;
const setMeta = (selector: string, content: string): void => document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
setMeta('meta[name="description"]', `${portfolio.name} — ${portfolio.title}. Explore my work, skills, and experience.`);
setMeta('meta[property="og:title"]', `${portfolio.name} | ${portfolio.title}`);
setMeta('meta[property="og:description"]', portfolio.bio);
setMeta('meta[property="og:url"]', portfolio.website);
setMeta('meta[property="og:image"]', new URL("favicon.svg", portfolio.website).href);
