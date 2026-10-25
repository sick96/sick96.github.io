/**
 * Fictional CTQ demo data for the Engineering Investigation & AI Analysis Platform
 * portfolio demo. All lot IDs, product names, zone names, parameter values,
 * specification limits, document titles, and excerpts are entirely fictional
 * and do not represent any real manufacturing process, specification, or system.
 */

// ─── Zone definitions ────────────────────────────────────────────────────────

export interface Zone {
    id: number;
    name: string;
    shortName: string;
}

export const ZONES: Zone[] = [
    { id: 1, name: "Zone 1 — Material Line",       shortName: "Material Line" },
    { id: 2, name: "Zone 2 — Assembly Line (A)",   shortName: "Assembly (A)" },
    { id: 3, name: "Zone 3 — Assembly Line (B)",   shortName: "Assembly (B)" },
    { id: 4, name: "Zone 4 — Test Line",            shortName: "Test Line" },
    { id: 5, name: "Zone 5 — VI / Packing",         shortName: "VI / Packing" },
];

// ─── CTQ record ───────────────────────────────────────────────────────────────

export type PassFail = "PASS" | "FAIL";

export interface CtqRecord {
    id: string;
    zone: number;
    product: string;
    wipType: string;
    process: string;
    step: string;
    parameter: string;
    actualValue: number;
    unit: string;
    specLimit: string;           // e.g. "≥ 95.0" or "< 0.15"
    passFailStatus: PassFail;
    measuredAt: string;          // ISO-like fictional timestamp
}

// ─── Lot definition ───────────────────────────────────────────────────────────

export interface Lot {
    id: string;
    product: string;
    wipType: string;
    currentZone: number;         // highest zone reached (1–5)
    currentStep: string;
    ctqRecords: CtqRecord[];
}

// ─── AI Analysis response ─────────────────────────────────────────────────────

export interface AiAnalysisResponse {
    ctqRecordId: string;
    documentTitle: string;
    documentExcerpt: string;
    ragSummary: string;
    recommendedActions: string[];
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const LOT_A: Lot = {
    id: "LOT-2025-A001",
    product: "NX-Cell 4200",
    wipType: "Anode Assembly",
    currentZone: 4,
    currentStep: "Electrical Characterisation",
    ctqRecords: [
        {
            id: "R001",
            zone: 1,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Slurry Mixing",
            step: "Active Material Dispersion",
            parameter: "Solid Content (%)",
            actualValue: 52.4,
            unit: "%",
            specLimit: "50.0 – 55.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-10 06:14",
        },
        {
            id: "R002",
            zone: 1,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Slurry Mixing",
            step: "Active Material Dispersion",
            parameter: "Viscosity (mPa·s)",
            actualValue: 4820,
            unit: "mPa·s",
            specLimit: "4000 – 6000",
            passFailStatus: "PASS",
            measuredAt: "2025-08-10 06:21",
        },
        {
            id: "R003",
            zone: 1,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Electrode Coating",
            step: "Coating Weight Check",
            parameter: "Areal Density (mg/cm²)",
            actualValue: 8.93,
            unit: "mg/cm²",
            specLimit: "8.50 – 9.50",
            passFailStatus: "PASS",
            measuredAt: "2025-08-10 08:05",
        },
        {
            id: "R004",
            zone: 2,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Calendering",
            step: "Thickness Verification",
            parameter: "Electrode Thickness (µm)",
            actualValue: 118.7,
            unit: "µm",
            specLimit: "112.0 – 124.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-10 11:30",
        },
        {
            id: "R005",
            zone: 2,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Calendering",
            step: "Porosity Measurement",
            parameter: "Electrode Porosity (%)",
            actualValue: 28.1,
            unit: "%",
            specLimit: "26.0 – 34.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-10 11:55",
        },
        {
            id: "R006",
            zone: 3,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Cell Stacking",
            step: "Stack Alignment Check",
            parameter: "Layer Misalignment (mm)",
            actualValue: 0.31,
            unit: "mm",
            specLimit: "≤ 0.25",
            passFailStatus: "FAIL",
            measuredAt: "2025-08-10 14:02",
        },
        {
            id: "R007",
            zone: 3,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Electrolyte Fill",
            step: "Fill Volume Verification",
            parameter: "Electrolyte Volume (mL)",
            actualValue: 2.84,
            unit: "mL",
            specLimit: "2.70 – 3.00",
            passFailStatus: "PASS",
            measuredAt: "2025-08-10 16:10",
        },
        {
            id: "R008",
            zone: 4,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Electrical Characterisation",
            step: "Capacity Test",
            parameter: "Initial Capacity (mAh)",
            actualValue: 3861,
            unit: "mAh",
            specLimit: "≥ 3900",
            passFailStatus: "FAIL",
            measuredAt: "2025-08-11 09:22",
        },
        {
            id: "R009",
            zone: 4,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Electrical Characterisation",
            step: "Internal Resistance",
            parameter: "DC Internal Resistance (mΩ)",
            actualValue: 14.6,
            unit: "mΩ",
            specLimit: "≤ 18.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-11 09:35",
        },
    ],
};

const LOT_B: Lot = {
    id: "LOT-2025-B012",
    product: "NX-Cell 4200",
    wipType: "Cathode Assembly",
    currentZone: 3,
    currentStep: "Cell Stacking",
    ctqRecords: [
        {
            id: "R101",
            zone: 1,
            product: "NX-Cell 4200",
            wipType: "Cathode Assembly",
            process: "Slurry Mixing",
            step: "Active Material Dispersion",
            parameter: "Solid Content (%)",
            actualValue: 56.8,
            unit: "%",
            specLimit: "54.0 – 59.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-09 05:44",
        },
        {
            id: "R102",
            zone: 1,
            product: "NX-Cell 4200",
            wipType: "Cathode Assembly",
            process: "Electrode Coating",
            step: "Coating Weight Check",
            parameter: "Areal Density (mg/cm²)",
            actualValue: 12.05,
            unit: "mg/cm²",
            specLimit: "11.50 – 13.00",
            passFailStatus: "PASS",
            measuredAt: "2025-08-09 07:58",
        },
        {
            id: "R103",
            zone: 2,
            product: "NX-Cell 4200",
            wipType: "Cathode Assembly",
            process: "Calendering",
            step: "Thickness Verification",
            parameter: "Electrode Thickness (µm)",
            actualValue: 134.2,
            unit: "µm",
            specLimit: "128.0 – 140.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-09 10:30",
        },
        {
            id: "R104",
            zone: 2,
            product: "NX-Cell 4200",
            wipType: "Cathode Assembly",
            process: "Calendering",
            step: "Porosity Measurement",
            parameter: "Electrode Porosity (%)",
            actualValue: 22.4,
            unit: "%",
            specLimit: "20.0 – 28.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-09 10:48",
        },
        {
            id: "R105",
            zone: 3,
            product: "NX-Cell 4200",
            wipType: "Cathode Assembly",
            process: "Cell Stacking",
            step: "Stack Alignment Check",
            parameter: "Layer Misalignment (mm)",
            actualValue: 0.19,
            unit: "mm",
            specLimit: "≤ 0.25",
            passFailStatus: "PASS",
            measuredAt: "2025-08-09 13:15",
        },
        {
            id: "R106",
            zone: 3,
            product: "NX-Cell 4200",
            wipType: "Cathode Assembly",
            process: "Cell Stacking",
            step: "Tab Weld Inspection",
            parameter: "Weld Pull Strength (N)",
            actualValue: 34.2,
            unit: "N",
            specLimit: "≥ 40.0",
            passFailStatus: "FAIL",
            measuredAt: "2025-08-09 13:52",
        },
    ],
};

const LOT_C: Lot = {
    id: "LOT-2025-C007",
    product: "NX-Module 12S",
    wipType: "Module Assembly",
    currentZone: 5,
    currentStep: "VI / Packing",
    ctqRecords: [
        {
            id: "R201",
            zone: 1,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Cell Incoming",
            step: "Cell Grading",
            parameter: "Cell Capacity Match (mAh)",
            actualValue: 3915,
            unit: "mAh",
            specLimit: "≥ 3900",
            passFailStatus: "PASS",
            measuredAt: "2025-08-07 04:10",
        },
        {
            id: "R202",
            zone: 2,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Busbar Welding",
            step: "Weld Quality Check",
            parameter: "Weld Pull Strength (N)",
            actualValue: 48.7,
            unit: "N",
            specLimit: "≥ 40.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-07 09:20",
        },
        {
            id: "R203",
            zone: 3,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Module Sealing",
            step: "Leak Test",
            parameter: "Leak Rate (cc/min)",
            actualValue: 0.004,
            unit: "cc/min",
            specLimit: "< 0.010",
            passFailStatus: "PASS",
            measuredAt: "2025-08-07 12:44",
        },
        {
            id: "R204",
            zone: 4,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Module Test",
            step: "Pack Capacity",
            parameter: "Module Capacity (Ah)",
            actualValue: 46.2,
            unit: "Ah",
            specLimit: "≥ 46.8",
            passFailStatus: "FAIL",
            measuredAt: "2025-08-07 15:30",
        },
        {
            id: "R205",
            zone: 4,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Module Test",
            step: "Insulation Resistance",
            parameter: "Insulation Resistance (MΩ)",
            actualValue: 1250,
            unit: "MΩ",
            specLimit: "≥ 500",
            passFailStatus: "PASS",
            measuredAt: "2025-08-07 15:48",
        },
        {
            id: "R206",
            zone: 5,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Visual Inspection",
            step: "Surface Defect Check",
            parameter: "Defect Count",
            actualValue: 0,
            unit: "count",
            specLimit: "≤ 2",
            passFailStatus: "PASS",
            measuredAt: "2025-08-08 07:00",
        },
        {
            id: "R207",
            zone: 5,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Packing",
            step: "Label Verification",
            parameter: "Barcode Scan Result",
            actualValue: 1,
            unit: "pass",
            specLimit: "= 1 (pass)",
            passFailStatus: "PASS",
            measuredAt: "2025-08-08 07:14",
        },
    ],
};

const LOT_D: Lot = {
    id: "LOT-2025-D044",
    product: "NX-Module 12S",
    wipType: "Module Assembly",
    currentZone: 2,
    currentStep: "Busbar Welding",
    ctqRecords: [
        {
            id: "R301",
            zone: 1,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Cell Incoming",
            step: "Cell Grading",
            parameter: "Cell Capacity Match (mAh)",
            actualValue: 3907,
            unit: "mAh",
            specLimit: "≥ 3900",
            passFailStatus: "PASS",
            measuredAt: "2025-08-11 03:50",
        },
        {
            id: "R302",
            zone: 1,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Cell Incoming",
            step: "OCV Check",
            parameter: "Open Circuit Voltage (V)",
            actualValue: 3.62,
            unit: "V",
            specLimit: "3.55 – 3.80",
            passFailStatus: "PASS",
            measuredAt: "2025-08-11 04:05",
        },
        {
            id: "R303",
            zone: 2,
            product: "NX-Module 12S",
            wipType: "Module Assembly",
            process: "Busbar Welding",
            step: "Weld Quality Check",
            parameter: "Weld Pull Strength (N)",
            actualValue: 37.1,
            unit: "N",
            specLimit: "≥ 40.0",
            passFailStatus: "FAIL",
            measuredAt: "2025-08-11 09:44",
        },
    ],
};

const LOT_E: Lot = {
    id: "LOT-2025-E088",
    product: "NX-Cell 4200",
    wipType: "Anode Assembly",
    currentZone: 1,
    currentStep: "Electrode Coating",
    ctqRecords: [
        {
            id: "R401",
            zone: 1,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Slurry Mixing",
            step: "Active Material Dispersion",
            parameter: "Solid Content (%)",
            actualValue: 53.1,
            unit: "%",
            specLimit: "50.0 – 55.0",
            passFailStatus: "PASS",
            measuredAt: "2025-08-12 05:00",
        },
        {
            id: "R402",
            zone: 1,
            product: "NX-Cell 4200",
            wipType: "Anode Assembly",
            process: "Slurry Mixing",
            step: "Active Material Dispersion",
            parameter: "Viscosity (mPa·s)",
            actualValue: 5410,
            unit: "mPa·s",
            specLimit: "4000 – 6000",
            passFailStatus: "PASS",
            measuredAt: "2025-08-12 05:15",
        },
    ],
};

export const SAMPLE_LOTS: Lot[] = [LOT_A, LOT_B, LOT_C, LOT_D, LOT_E];

export const SAMPLE_LOT_IDS: string[] = SAMPLE_LOTS.map((l) => l.id);

// Index for quick lookup
const LOT_INDEX: Record<string, Lot> = {};
for (const lot of SAMPLE_LOTS) {
    LOT_INDEX[lot.id] = lot;
}
export const getLot = (id: string): Lot | undefined => LOT_INDEX[id];

// ─── AI Analysis responses ────────────────────────────────────────────────────

const AI_RESPONSES: AiAnalysisResponse[] = [
    {
        ctqRecordId: "R006",
        documentTitle: "[DEMO] NX-Cell Stacking Process Control Guide — Rev C (Fictional)",
        documentExcerpt:
            "Section 4.3 — Layer Alignment Tolerance: Acceptable layer misalignment for NX-Cell anode-cathode stack pairs is ≤ 0.25 mm as measured at the cell periphery after Z-axis compression. Typical root causes for out-of-tolerance alignment include feed roller slippage, separator tension variation exceeding ±8%, or an incorrectly seated stack fixture. A warm-up drift of 0.05–0.08 mm is expected in the first 30 minutes of equipment operation; lots produced during warm-up should be subject to enhanced sampling.",
        ragSummary:
            "The recorded layer misalignment of 0.31 mm exceeds the ≤ 0.25 mm acceptance limit for this lot. Based on the referenced process guide, this type of out-of-tolerance result is typically associated with feed roller slippage or separator tension variation. It is possible that this lot was processed during equipment warm-up, which the guide notes can contribute 0.05–0.08 mm of positional drift before stabilisation.",
        recommendedActions: [
            "Confirm whether this lot was produced within the first 30 minutes of a stacking equipment start-up and check the warm-up qualification log.",
            "Inspect stacking equipment feed rollers for slippage indicators and verify separator tension readings from the run log.",
            "Perform 100% alignment re-measurement on this lot to characterise the distribution before disposition.",
            "Review adjacent lots from the same equipment run for similar trends.",
            "Hold lot pending engineering disposition. Do not advance to Zone 4.",
        ],
    },
    {
        ctqRecordId: "R008",
        documentTitle: "[DEMO] NX-Cell Electrical Characterisation Specification — Rev D (Fictional)",
        documentExcerpt:
            "Section 2.1 — Initial Capacity Acceptance: Minimum initial capacity for NX-Cell 4200 after the first formation cycle is 3900 mAh. Cells falling below this threshold most commonly indicate incomplete electrolyte wetting at the electrode interface or insufficient formation protocol duration. Reduced capacity may also correlate with areal density below 8.8 mg/cm² or electrode porosity below 26%. Check upstream CTQ records for correlated deviations before concluding on root cause.",
        ragSummary:
            "This lot recorded an initial capacity of 3861 mAh, which falls 39 mAh below the 3900 mAh acceptance minimum. The electrical characterisation specification identifies incomplete electrolyte wetting and insufficient formation duration as the most common contributors. Upstream CTQ records for this lot show all Zone 1 parameters within specification, though areal density at 8.93 mg/cm² is toward the lower portion of the accepted range. Zone 3 records include a layer misalignment failure, which could contribute to non-uniform current distribution and reduced usable capacity.",
        recommendedActions: [
            "Cross-reference the formation cycle log to confirm the protocol completed without interruption or timeout.",
            "Check electrolyte wetting hold time records for this lot against the minimum soak duration requirement.",
            "Review the Zone 3 layer misalignment failure (R006) as a possible contributing factor to capacity loss.",
            "Perform AC impedance spot-check on representative cells from this lot to assess interface condition.",
            "Hold lot pending engineering review and root cause determination.",
        ],
    },
    {
        ctqRecordId: "R106",
        documentTitle: "[DEMO] NX-Cell Tab Welding Process Specification — Rev B (Fictional)",
        documentExcerpt:
            "Section 5.2 — Tab Weld Pull Strength: Minimum pull strength for anode and cathode tab welds is 40.0 N as measured by a calibrated tensile fixture. Weld failures below this limit are categorised as mechanical non-conformances. Common contributing factors include contamination at the weld interface (oils, moisture, oxide layer), incorrect laser power calibration, or fixture clamping force outside the 12–18 N·m torque range. All weld strength data must be logged per lot for traceability.",
        ragSummary:
            "The measured tab weld pull strength for this lot is 34.2 N, falling below the 40.0 N minimum. According to the tab welding process specification, the most probable contributing factors are contamination at the weld interface, laser power deviation, or fixture clamping force outside its specification. Since this is the only CTQ failure recorded for this lot, a focused weld process review is recommended before drawing broader conclusions.",
        recommendedActions: [
            "Pull the laser calibration record for the welding station used on this lot and verify power and focus settings.",
            "Inspect weld interface surface preparation records (cleaning, oxide removal steps) for any deviations.",
            "Verify fixture clamping torque log for the run that produced this lot.",
            "Cross-section a sample weld from this lot for metallurgical inspection to characterise the failure mode.",
            "Contain this lot at Zone 3. Do not advance until weld non-conformance is dispositioned.",
        ],
    },
    {
        ctqRecordId: "R204",
        documentTitle: "[DEMO] NX-Module 12S Pack Performance Acceptance Criteria — Rev A (Fictional)",
        documentExcerpt:
            "Section 3.4 — Module Capacity Acceptance: The minimum acceptable module capacity at end-of-line test is 46.8 Ah under standard discharge conditions (0.5C, 25°C ± 2°C, to 2.5 V cut-off). Modules below this limit must be reviewed for constituent cell capacity matching, tab weld resistance, and temperature uniformity during test. A module capacity shortfall of more than 1.5% from the nominal target (47.5 Ah) warrants a cell-level teardown if weld and thermal records do not account for the deviation.",
        ragSummary:
            "Module capacity of 46.2 Ah falls 0.6 Ah below the 46.8 Ah acceptance minimum, which is approximately 1.3% below the nominal 47.5 Ah target. Per the acceptance criteria document, this level of shortfall is in the range that may be explained by constituent cell matching, weld resistance, or test temperature variation before a teardown is required. All Zone 1–3 upstream records for this lot show passing results, suggesting the shortfall may be test-condition or weld-related rather than a fundamental cell issue.",
        recommendedActions: [
            "Retrieve test temperature log for the module capacity test run and confirm ambient was within 25°C ± 2°C.",
            "Check tab and busbar weld resistance data for this lot if available, or perform in-situ resistance sweep.",
            "Compare cell-level OCV and capacity records to confirm matching quality before test.",
            "Re-test this module once temperature and equipment calibration have been verified, per retesting protocol.",
            "If re-test also fails, proceed to cell-level teardown per Section 3.4 escalation procedure.",
        ],
    },
    {
        ctqRecordId: "R303",
        documentTitle: "[DEMO] NX-Module Busbar Welding Process Control Guide — Rev C (Fictional)",
        documentExcerpt:
            "Section 4.1 — Busbar Weld Strength Requirement: All busbar-to-cell tab welds must achieve a minimum pull strength of 40.0 N to ensure mechanical integrity and low-resistance electrical continuity. Pull strength below 40.0 N is classified as a critical weld non-conformance. Equipment-related causes include laser focus drift, contaminated optical path, and insufficient inert gas purge. Material-related causes include tab surface oxidation or dimensional variation in busbar contact area.",
        ragSummary:
            "The busbar weld pull strength of 37.1 N is 2.9 N below the 40.0 N minimum acceptance limit. This is the only CTQ record for Zone 2 in this lot and represents a critical weld non-conformance per the process control guide. Equipment-related causes such as laser focus drift or optical contamination are most likely given this is an isolated measurement rather than a systematic result across multiple zones.",
        recommendedActions: [
            "Retrieve the welding station maintenance and calibration log for the run date and verify laser optics condition.",
            "Inspect inert gas purge records — confirm flow rate and purity were within specification during this weld run.",
            "Measure busbar and tab dimensional compliance for this lot's incoming material batch.",
            "Perform destructive weld cross-section on three sample joints to confirm failure mode (under-penetration, porosity, or surface contamination).",
            "Hold lot at Zone 2 pending weld investigation and engineering disposition.",
        ],
    },
];

const AI_INDEX: Record<string, AiAnalysisResponse> = {};
for (const resp of AI_RESPONSES) {
    AI_INDEX[resp.ctqRecordId] = resp;
}
export const getAiAnalysis = (ctqRecordId: string): AiAnalysisResponse | undefined =>
    AI_INDEX[ctqRecordId];

