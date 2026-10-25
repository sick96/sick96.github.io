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
    classification?: string;
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

export const portfolio: PortfolioData = {
    name: "Shawn",
    title: "Principal Software Engineer",
    location: "Penang, Malaysia",
    email: "cdshawn838@gmail.com",
    github: "https://github.com/sick96",
    linkedin: "https://www.linkedin.com/in/shawnchuan96/",
    website: "https://sick96.github.io/",

    bio: "I build backend services, data systems, and automation software for real-world engineering and manufacturing challenges.",

    about: [
        "I'm a Principal Software Engineer with a background in semiconductor test engineering and manufacturing systems. My career has taken me from NPI and production test, through tester and equipment integration, into software engineering, manufacturing data platforms, and engineering analytics.",

        "I focus on backend service development, data processing pipelines, and system integration. I enjoy problems where software meets the physical world: processing production telemetry, automating operational workflows, investigating system anomalies, and building robust tools for engineering teams.",

        "I'm strongest in C#, .NET, Python, SQL Server, and system integration. I also enjoy exploring newer technologies such as Generative AI, RAG, and Model Context Protocol to make engineering systems more intelligent and capable."
    ],

    skills: [
        {
            category: "Languages",
            skills: [
                "C#",
                "Python",
                "T-SQL",
                "TypeScript",
                "JavaScript"
            ]
        },
        {
            category: "Backend & APIs",
            skills: [
                ".NET",
                "ASP.NET Core",
                "REST APIs",
                "Dapper",
                "Backend Development",
                "API Design"
            ]
        },
        {
            category: "Frontend",
            skills: [
                "Angular",
                "TypeScript",
                "Bootstrap",
                "RxJS"
            ]
        },
        {
            category: "Data & Integration",
            skills: [
                "SQL Server",
                "Data Pipelines",
                "Manufacturing Data Integration",
                "RabbitMQ",
                "Serial / COM Communication",
                "Database Design",
                "Query Optimization"
            ]
        },
        {
            category: "Manufacturing Systems",
            skills: [
                "Test Systems",
                "Equipment Integration",
                "NPI / Production Handover",
                "MSA / GR&R",
                "SPC",
                "Production Troubleshooting",
                "Engineering Automation"
            ]
        },
        {
            category: "AI & Intelligent Automation",
            skills: [
                "Generative AI",
                "RAG",
                "Azure OpenAI",
                "Azure AI Search",
                "Model Context Protocol (MCP)",
                "AI-assisted Engineering Workflows",
                "Prompt Engineering"
            ]
        },
        {
            category: "Engineering",
            skills: [
                "Software Architecture",
                "Object-Oriented Programming",
                "System Integration",
                "Workflow Automation",
                "Production Software Support",
                "Git",
                "Bitbucket",
                "Jira"
            ]
        }
    ],

    projects: [
        {
            title: "Engineering Investigation & AI Analysis Platform",
            description:
                "An engineering investigation platform combining metadata-driven backend architecture with retrieval-augmented generation (RAG). Separates evolving domain rules from application logic to support structured analysis of complex quality data.",
            technologies: [
                "C#",
                "ASP.NET Core",
                "SQL Server",
                "Microsoft Fabric",
                "Azure OpenAI",
                "Azure AI Search",
                "RAG",
                "REST APIs",
                "Metadata-Driven Architecture"
            ],
            github: "",
            featured: true
        },
        {
            title: "Manufacturing Data Processing Platform",
            description:
                "An asynchronous Python data processing platform using RabbitMQ and SQL Server. Implements automated validation pipelines, engineering domain calculations, and structured exception handling to support reliable data quality.",
            technologies: [
                "Python",
                "SQL Server",
                "Data Pipelines",
                "Data Validation",
                "RabbitMQ",
                "Manufacturing Analytics"
            ],
            github: "",
            featured: true
        },
        {
            title: "Equipment & Test System Integration",
            description:
                "Integration services connecting physical test systems and serial equipment with engineering applications. Combines hardware communication, messaging, and database integration to automate data collection and support equipment-to-software traceability.",
            technologies: [
                "C#",
                ".NET",
                "Python",
                "RabbitMQ",
                "SQL Server",
                "Serial / COM",
                "Equipment Integration"
            ],
            github: "",
            featured: true
        },
        {
            title: "Engineering Portal & Workflow Automation",
            description:
                "A full-stack web portal consolidating operational workflows, dashboards, and engineering investigations. Uses an Angular and RxJS frontend with ASP.NET Core REST APIs to bring engineering tools and processes into a unified interface.",
            technologies: [
                "Angular",
                "TypeScript",
                "ASP.NET Core",
                "C#",
                "SQL Server",
                "REST APIs",
                "RxJS"
            ],
            github: "",
            featured: true
        },
        {
            title: "Manufacturing Monitoring & Alerting",
            description:
                "Background monitoring services that detect abnormal manufacturing conditions and send contextual email notifications. Includes relevant investigation data in alerts to help engineers assess issues and respond more efficiently.",
            technologies: [
                "C#",
                ".NET",
                "SQL Server",
                "Production Monitoring",
                "Email Automation"
            ],
            github: "",
            featured: false
        }
    ],

    experience: [
        {
            company: "Enovix Malaysia Sdn Bhd",
            position: "Principal Software Engineer",
            dates: "May 2024 — Present",
            description:
                "Develop production software, manufacturing data platforms, equipment integrations, and engineering applications supporting semiconductor and battery manufacturing operations.",
            highlights: [
                "Work across engineering, quality, IT, and manufacturing teams to translate operational problems into software and data solutions.",
                "Maintain and enhance Python-based manufacturing data processing, including production parsing, validation, engineering calculations, exception handling, and traceability.",
                "Design backend services, REST APIs, equipment integrations, and metadata-driven engineering platforms using C#, .NET, Python, SQL Server, RabbitMQ, and Angular.",
                "Explore Generative AI, RAG, and MCP to introduce intelligent capabilities into engineering workflows while keeping data access controlled and traceable."
            ]
        },
        {
            company: "Enovix Malaysia Sdn Bhd",
            position: "Test Engineer → Senior Test Engineer → Software Engineering",
            dates: "Earlier internal roles",
            description:
                "Started at Enovix on the manufacturing and test side before transitioning into the Engineering Software team.",
            highlights: [
                "Gained direct experience with test systems and production operations before transitioning into software engineering.",
                "Built strong domain knowledge of manufacturing processes, test data, production issues, and engineering workflows that later became the foundation for software development."
            ]
        },
        {
            company: "Robert Bosch Semiconductor Manufacturing Penang Sdn Bhd",
            position: "Test Engineer II",
            dates: "July 2023 — May 2024",
            description:
                "Supported semiconductor tester commissioning and production readiness during manufacturing plant setup.",
            highlights: [
                "Supported tester software setup, deployment, system integration, and manufacturing readiness during plant setup.",
                "Performed MSA and tester validation before production handover to Process and Equipment Engineering.",
                "Troubleshot test software, system integration, and manufacturing connectivity issues."
            ]
        },
        {
            company: "Lumileds Malaysia Sdn Bhd",
            position: "Test Development Engineer",
            dates: "August 2021 — June 2023",
            description:
                "Supported NPI wafer-level test development, measurement validation, and transition of test solutions into production.",
            highlights: [
                "Led GR&R, measurement correlation, SPC validation, and production readiness activities for NPI products.",
                "Performed correlation studies to establish measurement consistency between different test systems.",
                "Investigated yield, measurement, and test-system issues during NPI qualification and production handover."
            ]
        }
    ],

    education: [
        {
            institution: "Universiti Malaysia Perlis (UniMAP)",
            qualification: "Bachelor of Electrical Engineering Technology (Hons.) (Industrial Power)",
            dates: "Completed"
        },
        {
            institution: "Politeknik Ungku Omar (PUO)",
            qualification: "Diploma in Electronic Engineering (Communication)",
            dates: "Completed"
        }
    ]
};
