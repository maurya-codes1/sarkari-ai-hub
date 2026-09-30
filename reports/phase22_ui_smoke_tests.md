# SARKARIAI HUB — PHASE 22 UI SMOKE TESTS & LANGUAGE INDEPENDENCE AUDIT

**Audit Date:** 2026-09-30  
**Phase:** PHASE 22 — UNIVERSAL MULTILINGUAL UI + 24-LANGUAGE PRODUCTION QA  
**Scope:** Browser rendering, mobile responsive drawer, script rendering, RTL layout isolation, and Tests A through G.

---

## 1. LANGUAGE INDEPENDENCE TESTS (TESTS A THROUGH G)

A fundamental architectural mandate of SarkariAI Hub is that **UI Language is strictly decoupled from Exam Paper Medium and Question Language**. Changing the UI language must NEVER mutate question stems, alter option texts, translate official legal circulars, or override paper instructions.

### Test A: UI English + Hindi Paper
- **Setup:** User selects `en` (English) in global navigation dropdown. User starts **UPMSP Class 12 Hindi** or **BSEB Class 10 Hindi**.
- **Expected Behavior:**
  - Navigation, timer label ("Time Remaining"), question counter ("Question 1 of 100"), section tabs, and action buttons ("Save & Next", "Mark for Review") render in **English**.
  - Question text, poetry extracts, and MCQ options render in **authentic Devanagari Hindi** without synthetic machine translation.
- **Result:** ✅ **PASS**. Zero question leakage into English. Native Hindi script rendered intact.

### Test B: UI Hindi + English Paper
- **Setup:** User selects `hi` (Hindi) in global navigation dropdown. User starts **SSC CGL Tier-1 English Language Comprehension** or **UPSC CSE Prelims GS1 (English Paper)**.
- **Expected Behavior:**
  - Navigation, timer label ("शेष समय"), counter ("प्रश्न 1 / 100"), section title ("खंड क"), buttons ("सुरक्षित करें और आगे बढ़ें", "समीक्षा के लिए चिह्नित करें") render in **Hindi**.
  - English comprehension passages, idioms, vocabulary stems, and options render in **English** without pseudo-Hindi transliteration.
- **Result:** ✅ **PASS**. Question options and passage retain exact English source integrity.

### Test C: UI Hinglish + Tamil Paper
- **Setup:** User selects `hi-latn` (Hinglish) in global navigation dropdown. User starts **TNDGE SSLC Tamil Paper** (25 authentic PYQs).
- **Expected Behavior:**
  - Navigation ("Photo Resizer", "Rules Decoder", "₹10 Notes Vault"), buttons ("Save karke Next karein", "Review ke liye mark karein") render in **Hinglish/English fallback**.
  - Tamil questions, classical literature quotes, and options render in **authentic Tamil script**.
- **Result:** ✅ **PASS**. Tamil script renders with HarfBuzz open-type ligatures; Hinglish UI controls operate seamlessly.

### Test D: UI English + Bilingual Paper
- **Setup:** User selects `en` (English). User starts **SSC CGL Tier-1 General Awareness** (bilingual paper).
- **Expected Behavior:**
  - UI chrome renders in **English**.
  - Question stem displays primary text (Hindi or English) with secondary bilingual box (`[English: ...]` or `In English / Dual Medium:`) styled with distinct crimson left-border.
  - Options display bilingual format (`विकल्प / Option`) clearly parsed.
- **Result:** ✅ **PASS**. Bilingual dual-medium rendering verified.

### Test E: UI Regional (Bengali / Marathi) + English Paper
- **Setup:** User selects `bn` (Bengali) or `mr` (Marathi). User starts **UPSC NDA & NA General Ability Test (English section)**.
- **Expected Behavior:**
  - Header, footer, exam controls, status badges render in **Bengali / Marathi**.
  - NDA English questions and vocabulary remain in **English**.
- **Result:** ✅ **PASS**. Full cross-language independence maintained.

### Test F: UI Regional (Odia / Telugu) + Regional Paper
- **Setup:** User selects `or` (Odia) or `te` (Telugu). User starts **TSBIE/BIEAP Inter Chemistry** or **TNDGE SSLC**.
- **Expected Behavior:**
  - UI chrome in chosen regional language.
  - Exam paper in designated regional medium.
  - Zero cross-contamination between distinct regional scripts.
- **Result:** ✅ **PASS**. Odia/Telugu UI chrome isolated from Tamil/Telugu exam questions.

### Test G: UI Hindi + Tamil Question/Options + English Instructions
- **Setup:** Complex tripartite multilingual session: UI in `hi` (Hindi), subject paper in `ta` (Tamil), official examination board guidelines in `en` (English).
- **Expected Behavior:**
  - Portal chrome: Hindi (`हिन्दी`).
  - Section attempt banner: English instructions as promulgated by examining body.
  - Question container: Tamil questions with HarfBuzz glyph rendering.
- **Result:** ✅ **PASS**. All three layers remain strictly decoupled.

---

## 2. SCRIPT RENDERING & FONT FIDELITY QA

| Script Family | Target Locales | Font Family Loaded | Shaping Engine Verified | Mobile Viewport | Desktop Viewport |
|---|---|---|---|---|---|
| **Latin** | `en`, `hi-latn` | Plus Jakarta Sans / Roboto | Standard Kerning | ✅ PASS | ✅ PASS |
| **Devanagari** | `hi`, `mr`, `sa`, `mai`, `bho`, `ne`, `kok`, `doi`, `brx` | Noto Sans Devanagari | HarfBuzz Conjuncts & Matras | ✅ PASS | ✅ PASS |
| **Tamil** | `ta` | Noto Sans Tamil | Grantha Ligatures & Pulli | ✅ PASS | ✅ PASS |
| **Telugu** | `te` | Noto Sans Telugu | Watta Vattulu & Polu | ✅ PASS | ✅ PASS |
| **Bengali-Assamese** | `bn`, `as`, `mni` | Noto Sans Bengali | Juktakkhor & Ra-phala | ✅ PASS | ✅ PASS |
| **Gujarati** | `gu` | Noto Sans Gujarati | Shirorekha-less Kerning | ✅ PASS | ✅ PASS |
| **Kannada** | `kn` | Noto Sans Kannada | Ottu ligatures & Arkavattu | ✅ PASS | ✅ PASS |
| **Malayalam** | `ml` | Noto Sans Malayalam | Koottakksharam & Chillu | ✅ PASS | ✅ PASS |
| **Gurmukhi** | `pa` | Noto Sans Gurmukhi | Tippi, Adhak, Bindi | ✅ PASS | ✅ PASS |
| **Odia** | `or` | Noto Sans Oriya | Chulha Matras & Yuktakshara | ✅ PASS | ✅ PASS |
| **Perso-Arabic** | `ur`, `ks` | Noto Nastaliq Urdu | Nastaliq Diagonal Baseline | ✅ PASS | ✅ PASS |
| **Arabic-Sindhi** | `sd` | Noto Sans Arabic | 4-dot Nuqta Ligatures | ✅ PASS | ✅ PASS |
| **Ol Chiki** | `sat` | Noto Sans Ol Chiki | Linear Alphabetics | ✅ PASS | ✅ PASS |
| **Meetei Mayek** | `mni` | Noto Sans Meetei Mayek | Iyek & Cheikhei (Reserve) | ✅ PASS | ✅ PASS |

---

## 3. RTL LAYOUT ISOLATION QA (URDU, KASHMIRI, SINDHI)

| Component Surface | LTR (Hindi/English) | RTL (Urdu/Kashmiri/Sindhi) | Exam Isolation Enforcement | Verification |
|---|---|---|---|---|
| **Root Document** | `dir="ltr"`, `lang="hi"` | `dir="rtl"`, `lang="ur"` | UI Chrome mirrors naturally | ✅ PASS |
| **Global Header** | Logo left, controls right | Logo right, controls left | CSS flexbox reverse | ✅ PASS |
| **Mobile Drawer** | Slides from right | Slides from left | Transform inverted | ✅ PASS |
| **CBT Live Timer** | Top right anchor | Top left anchor | High-contrast countdown intact | ✅ PASS |
| **Question Palette** | 1..100 left-to-right | 1..100 right-to-left | Numbering legible & sequential | ✅ PASS |
| **Exam Question Stem** | Left-aligned LTR | **Strict LTR (`#quizQuestionContainer`)** | **FORCED LTR**: Paper integrity protected | ✅ PASS |
| **Exam Options List** | Left-aligned LTR | **Strict LTR (`.question-options-list`)** | **FORCED LTR**: Option letters A..D left-anchored | ✅ PASS |
| **Math & Equations** | Left-to-right math | **Strict LTR (`.math-tex`, `pre`, `code`)** | Mathematical symbols never inverted | ✅ PASS |
| **Action Buttons** | "Save & Next" right | "Save & Next" left-anchored | Directional margins flipped | ✅ PASS |

---

## 4. BROWSER & CLIENT-SIDE PERSISTENCE SMOKE TEST

1. **LocalStorage Persistence**:
   - Setting language to `ta` persists key `sarkariai_lang = 'ta'`.
   - Reloading browser maintains `document.documentElement.lang = 'ta'`.
   - Clearing cache defaults safely to `hi` (Hindi) with zero errors.
2. **Dropdown Synchronization**:
   - Desktop dropdown (`#langSelectDropdown`) and Mobile drawer dropdown (`#mobileLangSelectDropdown`) stay in 100% sync via custom `languageChanged` DOM event.
3. **Voice Question Reader Sync**:
   - Voice synthesis automatically resolves female/male BCP-47 speech voices corresponding to the active question medium (`ta-IN`, `te-IN`, `hi-IN`, `en-IN`), independent of UI chrome language.
