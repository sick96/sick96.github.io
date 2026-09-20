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

export const portfolio: PortfolioData = {
    name: "Shawn",
    title: "Principal Software Engineer",
    location: "Penang, Malaysia",
    email: "cdshawn838@gmail.com",
    github: "https://github.com/sick96",
    linkedin: "https://www.linkedin.com/in/shawnchuan96/",
    website: "https://sick96.github.io/",

    bio: "I build software for real manufacturing problems — connecting equipment, data, engineering workflows, and people.",

    about: [
        "I'm a Principal Software Engineer with a background in semiconductor test engineering and manufacturing systems. My career has taken me from NPI and production test, through tester and equipment integration, into software engineering, manufacturing data platforms, and engineering analytics.",

        "I enjoy working on problems where software meets the real world: processing production data, integrating equipment, automating engineering workflows, investigating manufacturing issues, and building tools that engineers can actually use on the shop floor.",

        "I'm strongest in backend development, SQL, Python, system integration, and manufacturing software. I also enjoy exploring newer technologies such as Generative AI, RAG, and Model Context Protocol to make engineering workflows more intelligent and easier to use."
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
            title: "CTQ Investigation & AI Analysis Platform",
            description:
                "A metadata-driven manufacturing investigation platform that helps engineers trace critical-to-quality measurements from finished-good lots across production processes. The platform separates manufacturing knowledge from application logic and supports AI-assisted analysis using engineering knowledge retrieval and structured recommendations.",
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
            title: "Production Data Processing Platform (DAE)",
            description:
                "A Python-based manufacturing data platform that parses, validates, transforms, and processes production test data from laboratory and manufacturing systems. The platform supports engineering calculations such as RSS, DCIR, and dQdV, while handling production exceptions, reloads, and data discrepancies.",
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
                "A collection of production data acquisition and integration services connecting manufacturing and laboratory equipment to centralized engineering systems through RabbitMQ, shared files, SQL Server, and serial communication. Includes equipment monitoring, automated data collection, and production traceability workflows.",
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
                "An internal engineering platform that turns manufacturing workflows into web-based applications and services. Modules include yield and utilization analytics, shipment readiness, grading verification, lot processing, engineering investigations, dashboards, monitoring, and workflow automation.",
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
                "Production monitoring services that detect abnormal manufacturing conditions and automatically notify engineers with the relevant investigation data. Designed to reduce manual monitoring and shorten the time between abnormal behavior and engineering response.",
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
                "Work across Process, Test, Quality, Yield, QT Lab, IT, and manufacturing teams to translate operational problems into software and data solutions.",
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
                "Worked in QT Lab test engineering and Zone 4 test engineering, gaining direct experience with battery test systems and production operations.",
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
                "Owned tester software setup including customized Windows environments, test software installation, domain integration, manufacturing data connectivity, and test software deployment.",
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
                "Performed production-to-laboratory correlation studies using golden/reference units to establish measurement consistency between different test systems.",
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