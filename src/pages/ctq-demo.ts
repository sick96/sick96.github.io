/**
 * CTQ Demo page — Engineering Investigation & AI Analysis Platform
 * All data is fictional and simulated for portfolio demonstration purposes only.
 */

import {
    ZONES,
    SAMPLE_LOT_IDS,
    getLot,
    getAiAnalysis,
    type Lot,
    type CtqRecord,
    type PassFail,
} from "../data/ctq-demo";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const esc = (s: string): string =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function parseIds(raw: string): string[] {
    const seen = new Set<string>();
    const ids: string[] = [];
    for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed && !seen.has(trimmed)) {
            seen.add(trimmed);
            ids.push(trimmed);
        }
    }
    return ids;
}

// ─── Filter state ─────────────────────────────────────────────────────────────

interface FilterState {
    product: string;
    wipType: string;
    process: string;
    step: string;
    parameter: string;
}

const emptyFilters = (): FilterState => ({
    product: "",
    wipType: "",
    process: "",
    step: "",
    parameter: "",
});

// ─── Page state ───────────────────────────────────────────────────────────────

interface PageState {
    lots: Lot[];
    selectedLotId: string | null;
    filters: FilterState;
    analysisRecordId: string | null;
}

const state: PageState = {
    lots: [],
    selectedLotId: null,
    filters: emptyFilters(),
    analysisRecordId: null,
};

// ─── Status badge ─────────────────────────────────────────────────────────────

function statusBadge(status: PassFail): string {
    return status === "PASS"
        ? `<span class="ctq-badge ctq-pass" aria-label="Pass">PASS</span>`
        : `<span class="ctq-badge ctq-fail" aria-label="Fail">FAIL</span>`;
}

// ─── Filter helpers ───────────────────────────────────────────────────────────

function applyFilters(records: CtqRecord[], f: FilterState): CtqRecord[] {
    return records.filter((r) => {
        if (f.product && r.product !== f.product) return false;
        if (f.wipType && r.wipType !== f.wipType) return false;
        if (f.process && !r.process.toLowerCase().includes(f.process.toLowerCase())) return false;
        if (f.step && !r.step.toLowerCase().includes(f.step.toLowerCase())) return false;
        if (f.parameter && !r.parameter.toLowerCase().includes(f.parameter.toLowerCase()))
            return false;
        return true;
    });
}

function uniqueSorted(items: string[]): string[] {
    return [...new Set(items)].sort();
}

function allRecordsAcrossLots(): CtqRecord[] {
    return state.lots.flatMap((l) => l.ctqRecords);
}

function buildSelectOptions(values: string[], selected: string, placeholder: string): string {
    const opts = values
        .map(
            (v) =>
                `<option value="${esc(v)}"${v === selected ? " selected" : ""}>${esc(v)}</option>`,
        )
        .join("");
    return `<option value="">${esc(placeholder)}</option>${opts}`;
}

// ─── Filter panel ─────────────────────────────────────────────────────────────

function renderFilters(records: CtqRecord[]): string {
    const products = uniqueSorted(records.map((r) => r.product));
    const wipTypes = uniqueSorted(records.map((r) => r.wipType));
    const f = state.filters;
    return `
<div class="ctq-filters" role="search" aria-label="CTQ record filters">
    <div class="ctq-filter-group">
        <label class="ctq-filter-label" for="filter-product">Product</label>
        <select class="ctq-filter-select" id="filter-product" data-filter="product">
            ${buildSelectOptions(products, f.product, "All Products")}
        </select>
    </div>
    <div class="ctq-filter-group">
        <label class="ctq-filter-label" for="filter-wiptype">WIP Type</label>
        <select class="ctq-filter-select" id="filter-wiptype" data-filter="wipType">
            ${buildSelectOptions(wipTypes, f.wipType, "All WIP Types")}
        </select>
    </div>
    <div class="ctq-filter-group">
        <label class="ctq-filter-label" for="filter-process">Process</label>
        <input class="ctq-filter-input" id="filter-process" type="text" placeholder="Filter by process…" value="${esc(f.process)}" data-filter="process" aria-label="Filter by process">
    </div>
    <div class="ctq-filter-group">
        <label class="ctq-filter-label" for="filter-step">Step</label>
        <input class="ctq-filter-input" id="filter-step" type="text" placeholder="Filter by step…" value="${esc(f.step)}" data-filter="step" aria-label="Filter by step">
    </div>
    <div class="ctq-filter-group">
        <label class="ctq-filter-label" for="filter-param">Parameter</label>
        <input class="ctq-filter-input" id="filter-param" type="text" placeholder="Filter by parameter…" value="${esc(f.parameter)}" data-filter="parameter" aria-label="Filter by parameter">
    </div>
    <button class="ctq-filter-clear button button-secondary" type="button" id="btn-clear-filters">Clear filters</button>
</div>`;
}

// ─── CTQ records table ────────────────────────────────────────────────────────

function renderRecordRows(records: CtqRecord[], showLotId = false): string {
    if (records.length === 0) {
        return `<tr><td colspan="${showLotId ? 8 : 7}" class="ctq-empty-cell">No records match the current filters.</td></tr>`;
    }
    return records
        .map((r) => {
            const hasAnalysis = r.passFailStatus === "FAIL" && !!getAiAnalysis(r.id);
            const analysisBtnHtml = hasAnalysis
                ? `<button class="ctq-ai-btn button button-primary" type="button"
                     data-record-id="${esc(r.id)}"
                     aria-label="AI Analysis for ${esc(r.parameter)} failure">
                     AI Analysis
                   </button>`
                : r.passFailStatus === "FAIL"
                  ? `<span class="ctq-muted">—</span>`
                  : "";
            const lotCol = showLotId
                ? `<td class="ctq-cell"><code>${esc(r.id.split("").slice(0, 8).join("").trim())}</code> <button class="ctq-lot-link" type="button" data-lot-id="${esc(getOwnerLotId(r.id))}">${esc(getOwnerLotId(r.id))}</button></td>`
                : "";
            return `<tr class="ctq-row ctq-row-${r.passFailStatus.toLowerCase()}">
                ${lotCol}
                <td class="ctq-cell">${esc(r.process)}</td>
                <td class="ctq-cell">${esc(r.step)}</td>
                <td class="ctq-cell ctq-param">${esc(r.parameter)}</td>
                <td class="ctq-cell ctq-num">${r.actualValue} ${esc(r.unit)}</td>
                <td class="ctq-cell ctq-spec">${esc(r.specLimit)}</td>
                <td class="ctq-cell">${statusBadge(r.passFailStatus)}</td>
                <td class="ctq-cell">${analysisBtnHtml}</td>
            </tr>`;
        })
        .join("");
}

function getOwnerLotId(recordId: string): string {
    for (const lot of state.lots) {
        if (lot.ctqRecords.some((r) => r.id === recordId)) return lot.id;
    }
    return "—";
}

// ─── Overview table ───────────────────────────────────────────────────────────

function renderOverviewRow(lot: Lot): string {
    const reachedRecords = lot.ctqRecords.filter((r) => r.zone <= lot.currentZone);
    const filtered = applyFilters(reachedRecords, state.filters);
    const total = filtered.length;
    const fails = filtered.filter((r) => r.passFailStatus === "FAIL").length;
    const zone = ZONES.find((z) => z.id === lot.currentZone);
    const ctqSummary =
        total === 0
            ? `<span class="ctq-muted">No records</span>`
            : fails > 0
              ? `<span class="ctq-fail-text">${fails} FAIL / ${total} total</span>`
              : `<span class="ctq-pass-text">All ${total} PASS</span>`;
    const isSelected = lot.id === state.selectedLotId;
    return `<tr class="ctq-row${isSelected ? " ctq-row-selected" : ""}">
        <td class="ctq-cell"><button class="ctq-lot-select-btn${isSelected ? " ctq-lot-select-btn-active" : ""}" type="button" data-lot-id="${esc(lot.id)}">${esc(lot.id)}</button></td>
        <td class="ctq-cell">${esc(lot.product)}</td>
        <td class="ctq-cell">${esc(lot.wipType)}</td>
        <td class="ctq-cell">${zone ? esc(zone.shortName) : "—"} (Z${lot.currentZone})</td>
        <td class="ctq-cell">${esc(lot.currentStep)}</td>
        <td class="ctq-cell">${ctqSummary}</td>
    </tr>`;
}

function renderOverview(): string {
    if (state.lots.length === 0) return "";
    return `
<section class="ctq-overview" aria-labelledby="overview-heading">
    <h2 id="overview-heading" class="ctq-section-heading">Lot Overview</h2>
    <p class="ctq-hint">Select a lot ID to view its zone-by-zone CTQ detail.</p>
    <div class="ctq-table-wrap">
        <table class="ctq-table" aria-label="Loaded lots overview">
            <thead>
                <tr>
                    <th scope="col">Lot ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">WIP Type</th>
                    <th scope="col">Current Zone</th>
                    <th scope="col">Current Step</th>
                    <th scope="col">CTQ Status</th>
                </tr>
            </thead>
            <tbody>${state.lots.map(renderOverviewRow).join("")}</tbody>
        </table>
    </div>
</section>`;
}

// ─── Individual lot detail ────────────────────────────────────────────────────

function renderZoneDetail(lot: Lot): string {
    const parts: string[] = [];
    for (const zone of ZONES) {
        const reached = zone.id <= lot.currentZone;
        const allZoneRecords = lot.ctqRecords.filter((r) => r.zone === zone.id);
        const filtered = applyFilters(allZoneRecords, state.filters);

        if (!reached) {
            parts.push(`
<div class="ctq-zone ctq-zone-pending">
    <h3 class="ctq-zone-heading ctq-zone-heading-pending">
        <span class="ctq-zone-indicator" aria-hidden="true">○</span>
        ${esc(zone.name)}
        <span class="ctq-zone-tag">Not yet reached</span>
    </h3>
</div>`);
            continue;
        }

        const fails = filtered.filter((r) => r.passFailStatus === "FAIL").length;
        const zoneStatus =
            filtered.length === 0
                ? "ctq-zone-no-data"
                : fails > 0
                  ? "ctq-zone-fail"
                  : "ctq-zone-pass";
        const indicator =
            filtered.length === 0 ? "–" : fails > 0 ? "✕" : "✓";
        const indicatorClass =
            filtered.length === 0 ? "" : fails > 0 ? "ctq-indicator-fail" : "ctq-indicator-pass";

        let tableHtml = "";
        if (filtered.length === 0 && allZoneRecords.length === 0) {
            tableHtml = `<p class="ctq-zone-empty">No CTQ records are available for this zone in the demo data.</p>`;
        } else if (filtered.length === 0) {
            tableHtml = `<p class="ctq-zone-empty">All records for this zone are hidden by the current filters.</p>`;
        } else {
            tableHtml = `
<div class="ctq-table-wrap">
    <table class="ctq-table" aria-label="CTQ records for ${esc(zone.shortName)}">
        <thead>
            <tr>
                <th scope="col">Process</th>
                <th scope="col">Step</th>
                <th scope="col">Parameter</th>
                <th scope="col">Actual</th>
                <th scope="col">Spec</th>
                <th scope="col">Status</th>
                <th scope="col">Analysis</th>
            </tr>
        </thead>
        <tbody>${renderRecordRows(filtered)}</tbody>
    </table>
</div>`;
        }

        parts.push(`
<div class="ctq-zone ${zoneStatus}">
    <h3 class="ctq-zone-heading">
        <span class="ctq-zone-indicator ${indicatorClass}" aria-hidden="true">${indicator}</span>
        ${esc(zone.name)}
    </h3>
    ${tableHtml}
</div>`);
    }
    return parts.join("");
}

function renderLotDetail(): string {
    if (!state.selectedLotId) return "";
    const lot = state.lots.find((l) => l.id === state.selectedLotId);
    if (!lot) return "";
    return `
<section class="ctq-lot-detail" aria-labelledby="lot-detail-heading">
    <div class="ctq-lot-detail-header">
        <div>
            <h2 id="lot-detail-heading" class="ctq-section-heading">
                Lot Detail — <code>${esc(lot.id)}</code>
            </h2>
            <p class="ctq-hint">${esc(lot.product)} · ${esc(lot.wipType)} · Current: ${esc(lot.currentStep)}</p>
        </div>
        <button class="button button-secondary ctq-back-btn" type="button" id="btn-back-to-overview">
            ← Back to Overview
        </button>
    </div>
    ${renderZoneDetail(lot)}
</section>`;
}

// ─── AI Analysis panel ────────────────────────────────────────────────────────

function renderAnalysisPanel(): string {
    if (!state.analysisRecordId) return "";

    // Find record
    let record: CtqRecord | undefined;
    let lot: Lot | undefined;
    for (const l of state.lots) {
        const r = l.ctqRecords.find((r) => r.id === state.analysisRecordId);
        if (r) {
            record = r;
            lot = l;
            break;
        }
    }
    if (!record || !lot) return "";
    const analysis = getAiAnalysis(record.id);
    if (!analysis) return "";
    const zone = ZONES.find((z) => z.id === record!.zone);

    return `
<div class="ctq-analysis-backdrop" id="analysis-backdrop" role="dialog" aria-modal="true" aria-labelledby="analysis-title">
    <div class="ctq-analysis-panel">
        <div class="ctq-analysis-header">
            <h2 id="analysis-title" class="ctq-analysis-title">AI Analysis — Simulated RAG Response</h2>
            <button class="ctq-analysis-close" type="button" id="btn-close-analysis" aria-label="Close AI analysis panel">✕</button>
        </div>

        <div class="ctq-analysis-disclaimer">
            <strong>Demo notice:</strong> This is a simulated retrieval-augmented generation (RAG) response using fictional sample data and documents. No live AI service, Azure OpenAI, Azure AI Search, or real production system is connected. All document titles, excerpts, and recommendations are fictional demo content only.
        </div>

        <div class="ctq-analysis-context">
            <h3 class="ctq-analysis-subtitle">Failure Context</h3>
            <dl class="ctq-analysis-dl">
                <div class="ctq-analysis-dl-row"><dt>Lot</dt><dd><code>${esc(lot.id)}</code></dd></div>
                <div class="ctq-analysis-dl-row"><dt>Zone</dt><dd>${zone ? esc(zone.name) : "—"}</dd></div>
                <div class="ctq-analysis-dl-row"><dt>Process / Step</dt><dd>${esc(record.process)} / ${esc(record.step)}</dd></div>
                <div class="ctq-analysis-dl-row"><dt>Parameter</dt><dd>${esc(record.parameter)}</dd></div>
                <div class="ctq-analysis-dl-row"><dt>Actual Value</dt><dd>${record.actualValue} ${esc(record.unit)}</dd></div>
                <div class="ctq-analysis-dl-row"><dt>Specification</dt><dd>${esc(record.specLimit)}</dd></div>
            </dl>
        </div>

        <div class="ctq-analysis-evidence">
            <h3 class="ctq-analysis-subtitle">Retrieved Document Evidence</h3>
            <div class="ctq-doc-card">
                <p class="ctq-doc-title">${esc(analysis.documentTitle)}</p>
                <blockquote class="ctq-doc-excerpt">${esc(analysis.documentExcerpt)}</blockquote>
            </div>
        </div>

        <div class="ctq-analysis-summary">
            <h3 class="ctq-analysis-subtitle">RAG-Generated Summary</h3>
            <p class="ctq-analysis-body">${esc(analysis.ragSummary)}</p>
        </div>

        <div class="ctq-analysis-actions">
            <h3 class="ctq-analysis-subtitle">Recommended Actions</h3>
            <ol class="ctq-action-list">
                ${analysis.recommendedActions.map((a) => `<li>${esc(a)}</li>`).join("")}
            </ol>
        </div>

        <button class="button button-secondary ctq-analysis-close-bottom" type="button" id="btn-close-analysis-bottom">
            Close Analysis
        </button>
    </div>
</div>`;
}

// ─── Input area ───────────────────────────────────────────────────────────────

function renderInput(): string {
    const currentIds = state.lots.map((l) => l.id).join("\n");
    return `
<section class="ctq-input-section" aria-labelledby="input-heading">
    <h2 id="input-heading" class="ctq-section-heading">Load Lots for Review</h2>
    <p class="ctq-hint">
        Paste one lot ID per line to load pending-shipment lots for CTQ review.
        All lot IDs and data in this demo are fictional.
    </p>
    <div class="ctq-input-row">
        <textarea
            class="ctq-textarea"
            id="lot-id-input"
            rows="5"
            placeholder="LOT-2025-A001&#10;LOT-2025-B012&#10;LOT-2025-C007"
            aria-label="Lot IDs, one per line"
            spellcheck="false"
        >${esc(currentIds)}</textarea>
        <div class="ctq-input-actions">
            <button class="button button-primary" type="button" id="btn-load-lots">Load Lots</button>
            <button class="button button-secondary" type="button" id="btn-sample">Load Sample Data</button>
        </div>
    </div>
    <div id="ctq-input-error" class="ctq-input-error" role="alert" aria-live="polite"></div>
</section>`;
}

// ─── About section ────────────────────────────────────────────────────────────

function renderAbout(): string {
    return `
<section class="ctq-about" aria-labelledby="about-heading">
    <h2 id="about-heading" class="ctq-section-heading">About This Demo</h2>
    <div class="ctq-about-grid">
        <div class="ctq-about-card">
            <p class="ctq-about-label">Problem</p>
            <p>Engineering teams receive pending-shipment lots that may have critical-to-quality failures across multiple manufacturing zones. Manually correlating lot traceability, CTQ records, and relevant engineering documents is time-consuming and error-prone.</p>
        </div>
        <div class="ctq-about-card">
            <p class="ctq-about-label">Workflow</p>
            <p>Lots pass through five manufacturing zones: Material Line → Assembly (A &amp; B) → Test Line → VI / Packing. Each zone produces CTQ measurements. A lot's current progress determines which zones and parameters are available for review — future zones are not shown.</p>
        </div>
        <div class="ctq-about-card">
            <p class="ctq-about-label">AI Analysis</p>
            <p>When a CTQ parameter fails, engineers can request an AI Analysis. The real application uses retrieval-augmented generation (RAG) to surface relevant excerpts from engineering documents alongside a grounded summary and recommended actions. This demo simulates that response with fictional documents and pre-written analysis.</p>
        </div>
        <div class="ctq-about-card">
            <p class="ctq-about-label">What is simulated</p>
            <p>All lot IDs, product names, parameter values, specifications, document titles, and AI responses in this demo are entirely fictional. No real production data, Azure OpenAI, Azure AI Search, SQL Server, or other production system is connected. The demo runs entirely in the browser.</p>
        </div>
    </div>
</section>`;
}

// ─── Track the container to which delegation listeners are attached ────────────
// Using a WeakRef so we can detect when the container has been replaced in the DOM.

let delegationContainer: HTMLElement | null = null;

// ─── Full page render ─────────────────────────────────────────────────────────

export function renderCtqDemoPage(container: HTMLElement): void {
    // Full re-render of the page content
    const filtersHtml = state.lots.length > 0 ? renderFilters(allRecordsAcrossLots()) : "";
    const overviewHtml = state.selectedLotId ? "" : renderOverview();
    const detailHtml = state.selectedLotId ? renderLotDetail() : "";
    const analysisHtml = renderAnalysisPanel();

    container.innerHTML = `
<div class="ctq-demo" id="ctq-demo-root">
    ${analysisHtml}
    <nav class="ctq-breadcrumb" aria-label="Page breadcrumb">
        <a href="#top" class="ctq-breadcrumb-link" id="btn-home-crumb">← Portfolio</a>
        <span aria-hidden="true">/</span>
        <span>Engineering Investigation &amp; AI Analysis Platform</span>
    </nav>

    <header class="ctq-demo-header">
        <p class="eyebrow">Featured Project</p>
        <h1 class="ctq-demo-title">Engineering Investigation &amp; AI Analysis Platform</h1>
        <p class="ctq-demo-subtitle">CTQ Monitoring &amp; Traceability — Interactive Demo</p>
    </header>

    ${renderAbout()}
    ${renderInput()}
    ${filtersHtml}
    ${overviewHtml}
    ${detailHtml}
</div>`;

    // Attach delegated listeners once per container instance.
    // If the container element itself was replaced (navigating away and back),
    // we re-attach to the new container.
    if (delegationContainer !== container) {
        attachDelegation(container);
        delegationContainer = container;
    }
    attachPerRenderBindings(container);
}

// ─── Delegated listeners — attached exactly once ──────────────────────────────

function attachDelegation(container: HTMLElement): void {
    // Delegated click — covers lot-select, back-to-overview, AI button, close buttons, backdrop
    container.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        // Overview lot select
        const lotSelectBtn = target.closest<HTMLElement>(".ctq-lot-select-btn");
        if (lotSelectBtn) {
            const lotId = lotSelectBtn.dataset["lotId"];
            if (lotId) {
                state.selectedLotId = lotId === state.selectedLotId ? null : lotId;
                state.analysisRecordId = null;
                renderCtqDemoPage(container);
                return;
            }
        }

        // Back to overview from lot detail
        if (target.closest("#btn-back-to-overview")) {
            state.selectedLotId = null;
            state.analysisRecordId = null;
            renderCtqDemoPage(container);
            return;
        }

        // AI Analysis button
        const aiBtn = target.closest<HTMLElement>(".ctq-ai-btn");
        if (aiBtn) {
            const recordId = aiBtn.dataset["recordId"];
            if (recordId) {
                state.analysisRecordId = recordId;
                renderCtqDemoPage(container);
                const panel = container.querySelector<HTMLElement>(".ctq-analysis-panel");
                if (panel) panel.focus();
                return;
            }
        }

        // Close analysis — ✕ button or "Close Analysis" button
        if (
            target.closest("#btn-close-analysis") ||
            target.closest("#btn-close-analysis-bottom")
        ) {
            state.analysisRecordId = null;
            renderCtqDemoPage(container);
            return;
        }

        // Backdrop click to close
        if (target.id === "analysis-backdrop") {
            state.analysisRecordId = null;
            renderCtqDemoPage(container);
            return;
        }
    });

    // Delegated change — select-based filters
    container.addEventListener("change", (e) => {
        const target = e.target as HTMLElement;
        const filterKey = target.dataset["filter"];
        if (filterKey && target instanceof HTMLSelectElement) {
            (state.filters as unknown as Record<string, string>)[filterKey] = target.value;
            state.selectedLotId = null;
            renderCtqDemoPage(container);
        }
    });

    // Delegated input — text-based filters
    container.addEventListener("input", (e) => {
        const target = e.target as HTMLElement;
        const filterKey = target.dataset["filter"];
        if (filterKey && target instanceof HTMLInputElement) {
            (state.filters as unknown as Record<string, string>)[filterKey] = target.value;
            state.selectedLotId = null;
            renderCtqDemoPage(container);
        }
    });

    // Escape key — close analysis panel (document-level; attached once)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && state.analysisRecordId) {
            state.analysisRecordId = null;
            renderCtqDemoPage(container);
        }
    });
}

// ─── Per-render bindings — re-attached after each innerHTML replacement ────────
// These are attached to newly created child elements, which are destroyed and
// recreated on every render, so they never accumulate.

function attachPerRenderBindings(container: HTMLElement): void {
    // Home breadcrumb link
    const homeBtn = container.querySelector<HTMLElement>("#btn-home-crumb");
    if (homeBtn) {
        homeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.hash = "#/home";
        });
    }

    // Load lots button
    const loadBtn = container.querySelector<HTMLButtonElement>("#btn-load-lots");
    if (loadBtn) {
        loadBtn.addEventListener("click", () => {
            const textarea = container.querySelector<HTMLTextAreaElement>("#lot-id-input");
            if (!textarea) return;
            handleLoadLots(textarea.value, container);
        });
    }

    // Sample data button
    const sampleBtn = container.querySelector<HTMLButtonElement>("#btn-sample");
    if (sampleBtn) {
        sampleBtn.addEventListener("click", () => {
            const textarea = container.querySelector<HTMLTextAreaElement>("#lot-id-input");
            if (textarea) textarea.value = SAMPLE_LOT_IDS.join("\n");
            handleLoadLots(SAMPLE_LOT_IDS.join("\n"), container);
        });
    }

    // Clear filters button
    const clearBtn = container.querySelector<HTMLButtonElement>("#btn-clear-filters");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            state.filters = emptyFilters();
            renderCtqDemoPage(container);
        });
    }

    // Textarea Ctrl/Cmd+Enter shortcut
    const textarea = container.querySelector<HTMLTextAreaElement>("#lot-id-input");
    if (textarea) {
        textarea.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                handleLoadLots(textarea.value, container);
            }
        });
    }
}

// ─── Load lots logic ──────────────────────────────────────────────────────────

function handleLoadLots(raw: string, container: HTMLElement): void {
    const errorEl = container.querySelector<HTMLElement>("#ctq-input-error");

    if (!raw.trim()) {
        if (errorEl) errorEl.textContent = "Please enter at least one lot ID.";
        state.lots = [];
        state.selectedLotId = null;
        state.analysisRecordId = null;
        renderCtqDemoPage(container);
        return;
    }

    const ids = parseIds(raw);
    const found: Lot[] = [];
    const unknown: string[] = [];

    for (const id of ids) {
        const lot = getLot(id);
        if (lot) found.push(lot);
        else unknown.push(id);
    }

    state.lots = found;
    state.selectedLotId = null;
    state.analysisRecordId = null;
    state.filters = emptyFilters();

    renderCtqDemoPage(container);

    // Update error/info message after re-render
    const newError = container.querySelector<HTMLElement>("#ctq-input-error");
    if (newError) {
        if (unknown.length > 0 && found.length === 0) {
            newError.textContent = `No recognised lot IDs found. Unknown: ${unknown.join(", ")}. Try loading the sample data.`;
        } else if (unknown.length > 0) {
            newError.textContent = `Loaded ${found.length} lot(s). Unrecognised IDs (not in demo data): ${unknown.join(", ")}.`;
        } else {
            newError.textContent = "";
        }
    }
}

