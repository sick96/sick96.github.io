/**
 * Minimal hash router for the portfolio site.
 * Supports /#/projects/engineering-investigation-ai for the CTQ demo page,
 * and treats all other hashes as homepage anchor navigation.
 *
 * Works with GitHub Pages static hosting — no server-side configuration needed.
 */

export type RouteId = "home" | "ctq-demo";

export interface Route {
    id: RouteId;
    hash: string;
}

export const ROUTES: Route[] = [
    { id: "home",     hash: "#/home" },
    { id: "ctq-demo", hash: "#/projects/engineering-investigation-ai" },
];

/** Resolve the current window.location.hash to a RouteId. */
export function currentRoute(): RouteId {
    const hash = window.location.hash;
    for (const route of ROUTES) {
        if (hash === route.hash || hash.startsWith(route.hash + "/")) {
            return route.id;
        }
    }
    // Any plain anchor (e.g. #top, #projects) is home
    return "home";
}

