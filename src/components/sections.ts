import { portfolio, type Education, type Experience, type Project, type SkillGroup } from "../data/portfolio";
import { icon } from "./icons";
const attrs = (url: string): string => url.startsWith("https://") ? ' target="_blank" rel="noreferrer"' : ' aria-disabled="true" tabindex="-1"';
const tags = (items: string[]): string => items.map((item) => `<li>${item}</li>`).join("");
const intro = (eyebrow: string, heading: string, copy?: string): string => `<div class="section-intro"><p class="eyebrow">${eyebrow}</p><h2>${heading}</h2>${copy ? `<p>${copy}</p>` : ""}</div>`;
export const hero = (): string => 
    `<section class="hero section" id="top" aria-labelledby="hero-heading">
        <div class="hero-copy">
            <p class="eyebrow">${portfolio.location} · Available for opportunities</p>
            <h1 id="hero-heading">Hi, I’m <span>${portfolio.name}.</span><br>${portfolio.title}.
            </h1>
            <p class="hero-lede">${portfolio.bio}</p>
            <div class="hero-actions">
                <a class="button button-primary" href="${portfolio.github}"${attrs(portfolio.github)}>View GitHub ${icon("github")}</a>
                <a class="button button-secondary" href="#contact">Get in touch ${icon("arrow")}</a>
            </div>
            <div class="hero-socials">
                <a href="${portfolio.github}"${attrs(portfolio.github)} aria-label="GitHub profile">${icon("github")}</a>
                <a href="${portfolio.linkedin}"${attrs(portfolio.linkedin)} aria-label="LinkedIn profile">${icon("linkedin")}</a>
            </div>
        </div>
        <div class="hero-art" aria-hidden="true">
            <div class="avatar-mark"><span>&lt;/&gt;</span></div>
            <div class="orbit orbit-one"></div>
            <div class="orbit orbit-two"></div>
            <span class="code-card code-card-one">string work =<br><b>"meaningful";</b></span>
            <span class="code-card code-card-two">build();</span>
        </div>
    </section>`;
export const about = (): string => `<section class="section section-surface" id="about" aria-labelledby="about-heading"><div class="about-grid">${intro("01 / About", "A little about me.")}<div class="prose">${portfolio.about.map((p) => `<p>${p}</p>`).join("")}</div></div></section>`;
const skill = (entry: SkillGroup): string => `<article class="skill-card"><h3>${entry.category}</h3><ul>${tags(entry.skills)}</ul></article>`;
export const skills = (): string => `<section class="section" id="skills" aria-labelledby="skills-heading">${intro("02 / Expertise", "Tools I use to bring ideas to life.", "A practical, evolving toolkit for shipping thoughtful web products.")}<div class="skills-grid">${portfolio.skills.map(skill).join("")}</div></section>`;
const projectMeta = (entry: Project): string => {
    const links: string[] = [];
    if (entry.github.startsWith("https://")) {
        links.push(`<a href="${entry.github}" target="_blank" rel="noreferrer" aria-label="${entry.title} source on GitHub">${icon("github")}</a>`);
    }
    if (entry.demo?.startsWith("https://")) {
        links.push(`<a href="${entry.demo}" target="_blank" rel="noreferrer" aria-label="${entry.title} live demo">${icon("external")}</a>`);
    }
    if (links.length > 0) {
        return `<div class="project-links">${links.join("")}</div>`;
    }
    const classification = entry.classification?.trim();
    if (classification) {
        return `<span class="project-meta">${classification}</span>`;
    }
    return "";
};
const project = (entry: Project): string => `<article class="project-card"><div class="project-top"><span class="project-index">${entry.featured ? "Featured project" : "Selected work"}</span>${projectMeta(entry)}</div><h3>${entry.title}</h3><p>${entry.description}</p><ul class="tag-list">${tags(entry.technologies)}</ul></article>`;
export const projects = (): string => `<section class="section section-surface" id="projects" aria-labelledby="projects-heading">${intro("03 / Projects", "A few things I’ve built.")}<div class="projects-grid">${portfolio.projects.map(project).join("")}</div></section>`;
const work = (entry: Experience): string => `<article class="timeline-entry"><div class="timeline-date">${entry.dates}</div><div><p class="entry-kicker">${entry.company}</p><h3>${entry.position}</h3><p>${entry.description}</p><ul class="check-list">${entry.highlights.map((item) => `<li>${item}</li>`).join("")}</ul></div></article>`;
export const experience = (): string => `<section class="section" id="experience" aria-labelledby="experience-heading"><div class="split-heading">${intro("04 / Experience", "Where I’ve made an impact.")}<p>Engineering software, data platforms, and equipment integration across manufacturing operations.</p></div><div class="timeline">${portfolio.experience.map(work).join("")}</div></section>`;
const educationItem = (entry: Education): string => `<article class="education-card"><p>${entry.dates}</p><h3>${entry.qualification}</h3><span>${entry.institution}</span></article>`;
export const education = (): string => `<section class="section section-surface education-section" id="education" aria-labelledby="education-heading">${intro("05 / Education", "Built on strong foundations.")}<div class="education-grid">${portfolio.education.map(educationItem).join("")}</div></section>`;
export const contact = (): string => `<section class="section contact-section" id="contact" aria-labelledby="contact-heading"><p class="eyebrow">06 / Contact</p><h2 id="contact-heading">Let’s build something<br><span>useful together.</span></h2><p>I’m always open to discussing new projects, opportunities, and good ideas.</p><a class="email-link" href="mailto:${portfolio.email}">${portfolio.email} ${icon("arrow")}</a><div class="contact-socials"><a href="${portfolio.github}"${attrs(portfolio.github)}>${icon("github")} GitHub</a><a href="${portfolio.linkedin}"${attrs(portfolio.linkedin)}>${icon("linkedin")} LinkedIn</a></div></section>`;
export const footer = (): string => `<footer class="site-footer"><a class="brand" href="#top">${portfolio.name}<span>.</span></a><p>© ${new Date().getFullYear()} ${portfolio.name}. Built with care.</p><div><a href="${portfolio.github}"${attrs(portfolio.github)} aria-label="GitHub">${icon("github")}</a><a href="${portfolio.linkedin}"${attrs(portfolio.linkedin)} aria-label="LinkedIn">${icon("linkedin")}</a></div></footer>`;
