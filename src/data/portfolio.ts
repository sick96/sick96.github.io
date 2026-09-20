export interface SkillGroup { 
    category: string; 
    skills: string[]; 
}
export interface Project { 
    title: string; 
    description: string; 
    technologies: string[]; 
    github: string; 
    demo?: string; 
    featured?: boolean; 
}
export interface Experience { 
    company: string; 
    position: string; 
    dates: string; 
    description: string; 
    highlights: string[]; 
}
export interface Education { 
    institution: string; 
    qualification: string; 
    dates: string; 
}
export interface PortfolioData { 
    name: string; 
    title: string; 
    bio: string; 
    location: string; 
    email: string; 
    github: string; 
    linkedin: string; 
    website: string; 
    about: string[]; 
    skills: SkillGroup[]; 
    projects: Project[]; 
    experience: Experience[]; 
    education: Education[]; 
}

// Update this file to make the portfolio yours. The UI reads all content from here.
export const portfolio: PortfolioData = {
    name: "Shawn", 
    title: "Software Engineer", 
    location: "Penang, Malaysia", 
    email: "cdshawn838@gmail.com", 
    github: "https://github.com/sick96", 
    linkedin: "https://www.linkedin.com/in/shawnchuan96/",
    website: "https://sick96.github.io/",
    bio: "[YOUR BIO] — I build thoughtful, reliable digital experiences for people and teams.",
    about: ["I am a developer who cares about the details: accessible interfaces, maintainable code, and products that feel good to use.", "My background has taught me to balance practical delivery with curiosity. I enjoy collaborating closely, learning in public, and turning ambiguous problems into useful software.", "I especially enjoy building polished web experiences, developer-friendly tools, and systems that make everyday work a little simpler."],
    skills: [
        { category: "Languages", 
            skills: ["Python", "C#", "TypeScript"] 
        }, 
        { category: "Frontend", 
            skills: ["Angular", "React", "Vite", "Responsive Design", "Accessibility"] 
        }, 
        { category: "Backend", 
            skills: ["Node.js", "REST APIs", "API Design", ".NET 10"] 
        }, 
        { category: "Database", 
            skills: ["T-SQL"] 
        }, 
        { category: "Tools", 
            skills: ["Git", "GitHub Actions", "VS Code"] 
        }, 
        { category: "Other", 
            skills: ["Testing", "CI/CD", "Performance", "Agile"] 
        },
    ],
    projects: [
        { title: "Project One", 
            description: "A concise description of a project you are proud of. Explain the user problem, your contribution, and the outcome.", 
            technologies: ["TypeScript", "Vite", "CSS"], 
            github: "[PROJECT GITHUB URL]", 
            demo: "[PROJECT LIVE DEMO URL]", 
            featured: true 
        },
        { title: "Project Two", 
            description: "A focused project that demonstrates a different capability, technical decision, or product outcome.", 
            technologies: ["React", "Node.js", "REST API"], 
            github: "[PROJECT GITHUB URL]", 
            demo: "[PROJECT LIVE DEMO URL]", 
            featured: true 
        },
        { title: "Project Three", 
            description: "A smaller experiment, open-source contribution, or product feature that shows how you like to work.", 
            technologies: ["JavaScript", "HTML", "CSS"], 
            github: "[PROJECT GITHUB URL]" 
        },
    ],
    experience: [
        { company: "[COMPANY NAME]", 
            position: "[YOUR POSITION]", 
            dates: "[START DATE] — [END DATE]", 
            description: "Describe your scope, the team context, and the value you helped create.", 
            highlights: ["Add a measurable achievement or impact statement.", "Add a responsibility that demonstrates your strengths."] 
        },
        { company: "[PREVIOUS COMPANY]", 
            position: "[PREVIOUS POSITION]", 
            dates: "[START DATE] — [END DATE]", 
            description: "Add a short summary of your role and the kinds of problems you worked on.", 
            highlights: ["Add a notable outcome, project, or contribution."] 
        },
    ],
    education: [
        { institution: "[INSTITUTION NAME]", 
            qualification: "[QUALIFICATION / FIELD OF STUDY]", 
            dates: "[START YEAR] — [END YEAR]" 
        }
    ],
};
