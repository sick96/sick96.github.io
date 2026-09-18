import "./style.css";

const heading = document.querySelector<HTMLHeadingElement>("h1");

if (!heading) {
    throw new Error("The page is missing its heading.");
}

heading.textContent = "Hello from TypeScript 7!";
