import "./style.css";
import { navigation } from "./components/navigation";
import { about, contact, education, experience, footer, hero, projects, skills } from "./components/sections";
import { icon } from "./components/icons";
import { portfolio } from "./data/portfolio";
import { currentRoute } from "./router";
import { renderCtqDemoPage } from "./pages/ctq-demo";

const appEl = document.querySelector<HTMLElement>("#app");
if (!appEl) throw new Error("The page is missing its application root.");
const app: HTMLElement = appEl;

// ─── Theme ────────────────────────────────────────────────────────────────────

const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme =
    savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

// ─── Metadata ─────────────────────────────────────────────────────────────────

document.title = `${portfolio.name} | ${portfolio.title}`;
const setMeta = (selector: string, content: string): void =>
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
setMeta('meta[name="description"]', `${portfolio.name} — ${portfolio.title}. Explore my work, skills, and experience.`);
setMeta('meta[property="og:title"]', `${portfolio.name} | ${portfolio.title}`);
setMeta('meta[property="og:description"]', portfolio.bio);
setMeta('meta[property="og:url"]', portfolio.website);
setMeta('meta[property="og:image"]', new URL("favicon.svg", portfolio.website).href);

// ─── Navigation / theme helpers ───────────────────────────────────────────────

function setupNav(): void {
    const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const siteNav = document.querySelector<HTMLElement>(".site-nav");
    if (!navToggle || !siteNav) return;

    const setNavigation = (open: boolean): void => {
        siteNav.classList.toggle("is-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
        navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        navToggle.innerHTML = icon(open ? "close" : "menu");
    };
    const closeNavigation = (): void => setNavigation(false);

    navToggle.addEventListener("click", () =>
        setNavigation(!siteNav.classList.contains("is-open")),
    );
    siteNav.addEventListener("click", (event) => {
        if ((event.target as HTMLElement).closest("a")) closeNavigation();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
            navToggle.focus();
        }
    });
}

function setupTheme(): void {
    const themeToggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
    if (!themeToggle) return;

    const setTheme = (theme: string): void => {
        document.documentElement.dataset["theme"] = theme;
        themeToggle.setAttribute(
            "aria-label",
            `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        );
    };
    setTheme(initialTheme);

    themeToggle.addEventListener("click", () => {
        const next = document.documentElement.dataset["theme"] === "dark" ? "light" : "dark";
        localStorage.setItem("portfolio-theme", next);
        setTheme(next);
    });
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

const HOMEPAGE_HTML =
    `${navigation()}<main id="main">${hero()}${about()}${skills()}${projects()}${experience()}${education()}${contact()}</main>${footer()}`;

function renderHomepage(): void {
    app.innerHTML = HOMEPAGE_HTML;
    setupNav();
    setupTheme();

    // Bind the CTQ demo project card
    bindCtqProjectCard();
}

function bindCtqProjectCard(): void {
    // Find the featured project card for Engineering Investigation & AI Analysis Platform
    // by matching its data attribute set by sections.ts
    const demoTrigger = document.querySelector<HTMLElement>("[data-project-demo=\"ctq\"]");
    if (demoTrigger) {
        const navigate = (): void => {
            window.location.hash = "#/projects/engineering-investigation-ai";
        };
        demoTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            navigate();
        });
        demoTrigger.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate();
            }
        });
    }
}

// ─── CTQ demo page ────────────────────────────────────────────────────────────

function renderCtqDemo(): void {
    app.innerHTML = `${navigation()}<main id="main" class="ctq-demo-main"></main>${footer()}`;
    setupNav();
    setupTheme();

    const main = document.querySelector<HTMLElement>("#main");
    if (!main) throw new Error("Missing #main element for CTQ demo.");

    renderCtqDemoPage(main);
}

// ─── Router ───────────────────────────────────────────────────────────────────

function handleRoute(): void {
    const route = currentRoute();
    if (route === "ctq-demo") {
        renderCtqDemo();
    } else {
        renderHomepage();
        // If hash is a known section anchor, scroll to it after render
        const hash = window.location.hash;
        if (hash && hash.startsWith("#") && !hash.startsWith("#/")) {
            const target = document.querySelector<HTMLElement>(hash);
            if (target) {
                // Small delay to let layout settle
                setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 50);
            }
        }
    }
}

// Apply theme before first render to avoid flash
document.documentElement.dataset["theme"] = initialTheme;

// Initial render
handleRoute();

// Handle hash changes (back/forward navigation and in-page links)
window.addEventListener("hashchange", handleRoute);
