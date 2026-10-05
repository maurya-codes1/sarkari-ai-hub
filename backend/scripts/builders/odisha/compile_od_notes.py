import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling 5 Master Revision Study Notes for Odisha Ecosystem...")

notes = [
    {
        "note_id": "note-bse-c10-math-summary",
        "subject_id": "od-c10-mathematics",
        "title": "BSE Odisha Class 10 HSC Mathematics Formulae, Theorems & Solved Patterns Compendium",
        "summary": "Complete revision sheet for Patiganita, Bijaganita, and Jyamiti covering Linear Equations, Quadratic Formula, AP, Thales Theorem, Circle Tangents, and Coordinate Geometry.",
        "content": """# BSE ODISHA CLASS 10 MATHEMATICS RAPID REVISION MASTER NOTES

## 1. ବୀଜଗଣିତ (Algebra)
- **ସରଳ ସହସମୀକରଣ (Linear Simultaneous Equations):**
  - General Form: $a_1 x + b_1 y + c_1 = 0$, $a_2 x + b_2 y + c_2 = 0$.
  - Consistency Conditions:
    - Unique solution (ଅନନ୍ୟ ସମାଧାନ): $a_1/a_2 \\neq b_1/b_2$.
    - Infinite solutions (ଅସଂଖ୍ୟ ସମାଧାନ): $a_1/a_2 = b_1/b_2 = c_1/c_2$.
    - No solution (ଅସମ୍ଭବ / କୌଣସି ସମାଧାନ ନାହିଁ): $a_1/a_2 = b_1/b_2 \\neq c_1/c_2$.
  - କ୍ରସ୍-ଗୁଣନ ପଦ୍ଧତି (Cross-multiplication): $x = (b_1 c_2 - b_2 c_1)/(a_1 b_2 - a_2 b_1)$, $y = (c_1 a_2 - c_2 a_1)/(a_1 b_2 - a_2 b_1)$.

- **ଦ୍ୱିଘାତ ସମୀକରଣ (Quadratic Equations):**
  - Standard Form: $a x^2 + b x + c = 0$ ($a \\neq 0$).
  - ପ୍ରଭେଦକ (Discriminant): $D = b^2 - 4ac$.
    - $D > 0$: ବାସ୍ତବ ଓ ଅସମାନ ମୂଳ (Real and distinct roots).
    - $D = 0$: ବାସ୍ତବ ଓ ସମାନ ମୂଳ (Real and equal roots, $x = -b/(2a)$).
    - $D < 0$: କୌଣସି ବାସ୍ତବ ମୂଳ ନାହିଁ (No real roots).
  - ମୂଳଦ୍ୱୟର ଯୋଗଫଳ: $\\alpha + \\beta = -b/a$; ଗୁଣଫଳ: $\\alpha\\beta = c/a$.

- **ସମାନ୍ତର ପ୍ରଗତି (Arithmetic Progression):**
  - $n$-th term: $t_n = a + (n - 1)d$.
  - Sum of first $n$ terms: $S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}[a + l]$.

## 2. ଜ୍ୟାମିତି (Geometry)
- **ଥାଲେସ୍‌ଙ୍କ ଉପପାଦ୍ୟ (Thales' Theorem / Basic Proportionality):**
  - ଯଦି ଗୋଟିଏ ତ୍ରିଭୁଜର ଗୋଟିଏ ବାହୁ ସହ ସମାନ୍ତର କରି ଅଙ୍କିତ ସରଳରେଖା ଅନ୍ୟ ଦୁଇ ବାହୁକୁ ଛେଦ କରେ, ତେବେ ତାହା ଉକ୍ତ ବାହୁଦ୍ୱୟକୁ ସମାନ ଅନୁପାତରେ ବିଭାଜନ କରେ ($AD/DB = AE/EC$).
- **ବୃତ୍ତ ଓ ସ୍ପର୍ଶକ (Circles & Tangents):**
  - ବୃତ୍ତର ଏକ ବହିଃସ୍ଥ ବିନ୍ଦୁରୁ ଅଙ୍କିତ ସ୍ପର୍ଶକ ଖଣ୍ଡଦ୍ୱୟର ଦୈର୍ଘ୍ୟ ସମାନ ($PA = PB$).
  - Alternate Segment Theorem: ସ୍ପର୍ଶ ବିନ୍ଦୁରେ ଅଙ୍କିତ ଜ୍ୟା ଓ ସ୍ପର୍ଶକ ମଧ୍ୟବର୍ତ୍ତୀ କୋଣ ଏକାନ୍ତର ବୃତ୍ତଖଣ୍ଡସ୍ଥ କୋଣ ସହ ସମାନ।

## 3. ସ୍ଥାନାଙ୍କ ଜ୍ୟାମିତି ଓ ତ୍ରିକୋଣମିତି (Coordinate Geometry & Trigonometry)
- Distance Formula: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.
- Section Formula: $P(x, y) = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right)$.
- Trigonometric Identities: $\\sin^2 \\theta + \\cos^2 \\theta = 1$, $1 + \\tan^2 \\theta = \\sec^2 \\theta$, $1 + \\cot^2 \\theta = \\csc^2 \\theta$."""
    },
    {
        "note_id": "note-bse-c10-gsc-summary",
        "subject_id": "od-c10-general-science",
        "title": "BSE Odisha Class 10 General Science (Physical & Life Science) Rapid Master Notes",
        "summary": "Core revision summary for Chemical Reactions, Acids/Bases, Metals, Carbon, Light, Human Eye, Electricity, Digestion, Respiration, Genetics, and Environment.",
        "content": """# BSE ODISHA CLASS 10 GENERAL SCIENCE MASTER REVISION

## 1. ଭୌତିକ ବିଜ୍ଞାନ (Physical Science)
- **ରାସାୟନିକ ପ୍ରତିକ୍ରିୟା (Chemical Reactions):**
  - ସଂଶ୍ଳେଷଣ (Combination): $CaO + H_2O \\rightarrow Ca(OH)_2 + \\text{Heat}$.
  - ବିଘଟନ (Decomposition): $2FeSO_4 \\xrightarrow{\\Delta} Fe_2O_3 + SO_2 + SO_3$.
  - ବିସ୍ଥାପନ (Displacement): $Fe + CuSO_4 \\rightarrow FeSO_4 + Cu$.
  - ଜାରଣ-ବିଜାରଣ (Redox): $CuO + H_2 \\xrightarrow{\\Delta} Cu + H_2O$.
- **ଅମ୍ଳ, କ୍ଷାରକ ଓ ଲବଣ (Acids, Bases & Salts):**
  - pH Scale: $pH < 7$ (Acidic), $pH = 7$ (Neutral), $pH > 7$ (Basic).
  - ତୁତିଆ (Blue Vitriol): $CuSO_4 \\cdot 5H_2O$; ପ୍ଲାଷ୍ଟର ଅଫ ପ୍ୟାରିସ: $CaSO_4 \\cdot \\frac{1}{2}H_2O$.
- **ବିଦ୍ୟୁତ (Electricity):**
  - ଓହ୍ମଙ୍କ ନିୟମ (Ohm's Law): $V = IR$.
  - ଶ୍ରେଣୀ ସଂଯୋଗ (Series): $R_s = R_1 + R_2 + R_3$.
  - ସମାନ୍ତର ସଂଯୋଗ (Parallel): $1/R_p = 1/R_1 + 1/R_2 + 1/R_3$.
  - ଜୁଲ୍‌ଙ୍କ ତାପନ ନିୟମ (Joule's Heating): $H = I^2 R t$.

## 2. ଜୀବ ବିଜ୍ଞାନ (Life Science)
- **ଆଲୋକଶ୍ଳେଷଣ (Photosynthesis):**
  - $6CO_2 + 12H_2O \\xrightarrow[\\text{Chlorophyll}]{\\text{Sunlight}} C_6H_{12}O_6 + 6O_2 + 6H_2O$.
  - ଆଲୋକ ପ୍ରକ୍ରିୟା (Light reaction in Grana / Thylakoids) & ଅନ୍ଧକାର ପ୍ରକ୍ରିୟା (Calvin cycle in Stroma).
- **ରେଚନ ତନ୍ତ୍ର (Excretion in Humans):**
  - ବୃକ୍କ (Kidney) ର ଗଠନମୂଳକ ଓ କାର୍ଯ୍ୟକାରୀ ଏକକ ହେଉଛି ନେଫ୍ରନ୍ (Nephron).
  - ଗ୍ଲୋମେରୁଲସ୍ (Glomerulus) ରେ ଅଲ୍ଟ୍ରାଫିଲ୍ଟ୍ରେସନ୍ ସମ୍ପାଦିତ ହୁଏ।
- **ବଂଶଗତି (Genetics):**
  - ମେଣ୍ଡେଲଙ୍କ ମନୋହାଇବ୍ରିଡ୍ କ୍ରସ୍ ଅନୁପାତ (Phenotypic: $3:1$, Genotypic: $1:2:1$).
  - ଡାଇହାଇବ୍ରିଡ୍ କ୍ରସ୍ ଅନୁପାତ: $9:3:3:1$."""
    },
    {
        "note_id": "note-chse-c12-phy-summary",
        "subject_id": "od-c12-physics",
        "title": "CHSE Odisha Class 12 Physics High-Yield Revision Compendium",
        "summary": "Essential formulas and conceptual derivations covering Electrostatics, Current Electricity, Magnetism, Optics, Semiconductor Electronics, and Modern Physics.",
        "content": """# CHSE ODISHA CLASS 12 PHYSICS HIGH-YIELD REVISION GUIDE

## 1. Electrostatics & Current Electricity
- **Gauss's Law:** $\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enc}}}{\\varepsilon_0}$.
- **Capacitance:** Parallel Plate $C = \\frac{\\kappa \\varepsilon_0 A}{d}$; Energy Density $u_E = \\frac{1}{2} \\varepsilon_0 E^2$.
- **Kirchhoff's Laws:**
  - Junction Rule: $\\sum I = 0$ (Conservation of Charge).
  - Loop Rule: $\\sum V = \\sum IR$ (Conservation of Energy).
- **Drift Velocity & Conductivity:** $I = n e A v_d$; $\\sigma = \\frac{n e^2 \\tau}{m}$.

## 2. Magnetism & Electromagnetic Induction
- **Biot-Savart Law:** $d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\hat{r}}{r^2}$.
- **Faraday's Law & Lenz's Law:** $\\varepsilon = -\\frac{d\\Phi_B}{dt} = -L \\frac{dI}{dt}$.
- **LCR Series Resonance:** Resonance frequency $\\omega_0 = \\frac{1}{\\sqrt{LC}}$; Impedance $Z = R$ (minimum), Current is maximum.

## 3. Optics & Modern Physics
- **Lens Maker's Formula:** $\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$.
- **Young's Double Slit Fringe Width:** $\\beta = \\frac{\\lambda D}{d}$.
- **Einstein's Photoelectric Equation:** $h\\nu = \\Phi_0 + K_{\\max} = h\\nu_0 + e V_0$.
- **de Broglie Wavelength:** $\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2 m q V}}$."""
    },
    {
        "note_id": "note-chse-c12-che-summary",
        "subject_id": "od-c12-chemistry",
        "title": "CHSE Odisha Class 12 Chemistry Organic Mechanisms & Physical Formula Sheet",
        "summary": "Master handbook for Solutions, Electrochemistry, Chemical Kinetics, Coordination Compounds, Name Reactions, and Biomolecules.",
        "content": """# CHSE ODISHA CLASS 12 CHEMISTRY MASTER COMPENDIUM

## 1. Physical Chemistry
- **Solutions & Colligative Properties:**
  - Relative lowering of vapour pressure: $\\frac{p_1^0 - p_1}{p_1^0} = i x_2$.
  - Elevation of boiling point: $\\Delta T_b = i K_b m$; Depression of freezing point: $\\Delta T_f = i K_f m$.
  - Osmotic pressure: $\\Pi = i C R T$.
- **Electrochemistry:**
  - Nernst Equation: $E_{\\text{cell}} = E^0_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} Q$ (at $298\\text{ K}$).
  - Kohlrausch's Law: $\\Lambda_m^0 = \\nu_+ \\lambda_+^0 + \\nu_- \\lambda_-^0$.
- **Chemical Kinetics:**
  - First-order rate constant: $k = \\frac{2.303}{t} \\log_{10}\\left(\\frac{[A]_0}{[A]}\\right)$; Half-life $t_{1/2} = \\frac{0.693}{k}$.
  - Arrhenius Equation: $k = A e^{-E_a / RT}$.

## 2. Organic Name Reactions
- **Aldol Condensation:** Carbonyls with $\\alpha$-hydrogen in presence of dilute alkali form $\\beta$-hydroxy carbonyls.
- **Cannizzaro Reaction:** Aldehydes without $\\alpha$-hydrogen in presence of conc. $NaOH$ disproportionate to alcohol and carboxylate salt.
- **Reimer-Tiemann Reaction:** Phenol + $CHCl_3 + 3NaOH \\xrightarrow{340\\text{ K}} \\text{Salicylaldehyde}$.
- **Sandmeyer Reaction:** Benzene diazonium chloride + $Cu_2Cl_2/HCl \\rightarrow \\text{Chlorobenzene} + N_2$."""
    },
    {
        "note_id": "note-chse-c12-bse-odia-summary",
        "subject_id": "od-c10-odia-fl",
        "title": "BSE & CHSE Odisha First Language / MIL Odia Literature & Grammar Master Compendium",
        "summary": "Comprehensive analysis of classical Odia prose, poetry, Sarala Mahabharata traditions, Bhakti literature, modern nationalist poetry, and advanced grammar.",
        "content": """# BSE & CHSE ODISHA FIRST LANGUAGE / MIL ODIA REVISION GUIDE

## ୧. ପ୍ରାଚୀନ ଓ ମଧ୍ୟଯୁଗୀୟ ଓଡ଼ିଆ ସାହିତ୍ୟ (Classical Traditions)
- **ସାରଳା ଦାସ:** ଆଦିକବି ସାରଳା ଦାସଙ୍କ ଚଣ୍ଡୀପୁରାଣ, ବିଳଙ୍କା ରାମାୟଣ ଓ ମହାଭାରତ - ଓଡ଼ିଆ ଜାତୀୟତାର ମୂଳଦୁଆ।
- **ପଞ୍ଚସଖା ଯୁଗ:** ବଳରାମ ଦାସ (ଜଗମୋହନ ରାମାୟଣ), ଜଗନ୍ନାଥ ଦାସ (ଭାଗବତ), ଅଚ୍ୟୁତାନନ୍ଦ ଦାସ, ଯଶୋବନ୍ତ ଦାସ ଓ ଅନନ୍ତ ଦାସ।
- **ରୀତିଯୁଗୀୟ କାବ୍ୟ:** କବିସମ୍ରାଟ ଉପେନ୍ଦ୍ର ଭଞ୍ଜ (ବୈଦେହୀଶ ବିଳାସ, ଲାବଣ୍ୟବତୀ, କୋଟିବ୍ରହ୍ମାଣ୍ଡ ସୁନ୍ଦରୀ) - ଅଳଙ୍କାର, ଛାନ୍ଦ ଓ ଶବ୍ଦ ଚାତୁରୀର ଅନନ୍ୟ ଶିଖର।
- **କବିସୂର୍ଯ୍ୟ ବଳଦେବ ରଥ:** କିଶୋରଚନ୍ଦ୍ରାନନ୍ଦ ଚମ୍ପୂ - ସଙ୍ଗୀତ ଓ ଭାବର ଅପୂର୍ବ ସମନ୍ୱୟ।

## ୨. ଆଧୁନିକ ଯୁଗ ଓ ସତ୍ୟବାଦୀ ସାହିତ୍ୟ (Modern & Satyabadi Era)
- **ରାଧାନାଥ ରାୟ:** କବିବର ରାଧାନାଥ ରାୟଙ୍କ ଚନ୍ଦ୍ରଭାଗା, ଚିଲିକା, ଦରବାର ଓ ଯଯାତିକେଶରୀ - ପ୍ରକୃତି ଚିତ୍ରଣ ଓ ଦେଶାତ୍ମବୋଧ।
- **ଭକ୍ତକବି ମଧୁସୂଦନ ରାଓ:** କୁସୁମ, ଉତ୍ସବ, ଆକାଶ ପ୍ରତି - ଆଧ୍ୟାତ୍ମିକ ଭାବଧାରା।
- **ଫକୀର ମୋହନ ସେନାପତି:** ଉପନ୍ୟାସ ସମ୍ରାଟଙ୍କ ଛ'ମାଣ ଆଠଗୁଣ୍ଠ, ଲଛମା, ମାମୁଁ, ପ୍ରାୟଶ୍ଚିତ୍ତ ଏବଂ ରେବତୀ (ଓଡ଼ିଆର ପ୍ରଥମ ଆଧୁନିକ ଗଳ୍ପ)।
- **ସ୍ୱଭାବକବି ଗଙ୍ଗାଧର ମେହେର:** ତପସ୍ୱିନୀ, ପ୍ରଣୟବଲ୍ଲରୀ, କୀଚକବଧ - ସୀତା ଚରିତ୍ରର ପବିତ୍ର ରୂପାୟନ।
- **ଉତ୍କଳମଣି ଗୋପବନ୍ଧୁ ଦାସ:** କାରାକବିତା, ବନ୍ଦୀର ଆତ୍ମକଥା, ଧର୍ମପଦ - ଜାତୀୟତାବାଦ ଓ ତ୍ୟାଗର ଆଦର୍ଶ।

## ୩. ବ୍ୟାକରଣ ପ୍ରୟୋଗ (Odia Grammar Essentials)
- **ବାକ୍ୟ ଗଠନ ରୀତି:** ଗଠନ ଦୃଷ୍ଟିରୁ ସରଳ, ଯୌଗିକ ଓ ଜଟିଳ ବାକ୍ୟ।
- **ସମାସ:** ତତ୍ପୁରୁଷ, କର୍ମଧାରୟ, ଦ୍ୱିଗୁ, ବହୁବ୍ରୀହି, ଦ୍ୱନ୍ଦ୍ୱ ଓ ଅବ୍ୟୟୀଭାବ।
- **ଅଳଙ୍କାର:** ଶବ୍ଦାଳଙ୍କାର (ଅନୁପ୍ରାସ, ଯମକ, ଶ୍ଳେଷ) ଏବଂ ଅର୍ଥାଳଙ୍କାର (ଉପମା, ରୂପକ, ଉତ୍ପ୍ରେକ୍ଷା)।"""
    }
]

out_path = os.path.join(os.path.dirname(__file__), "od_bundled_notes.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"Successfully compiled {len(notes)} Odisha master revision notes into {out_path}!")
