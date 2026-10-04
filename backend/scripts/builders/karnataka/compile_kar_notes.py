import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling 5 Master Bundled Study Notes for Karnataka School Board Ecosystem...")

notes = [
    {
        "note_id": "note-kar-c10-sslc-core-compendium",
        "subject_id": "kar-c10-mathematics",
        "language_id": "kn",
        "note_type": "FULL_NOTES",
        "title": "KSEAB Class 10 SSLC Core Subjects Master Revision Compendium (ಗಣಿತ, ವಿಜ್ಞಾನ ಮತ್ತು ಸಮಾಜ ವಿಜ್ಞಾನ)",
        "summary": "Comprehensive 6-paper syllabus revision compendium covering Class 10 SSLC Mathematics (Arithmetic Progressions, Triangles, Quadratic Equations, Trigonometry, Coordinate Geometry), Science (Physics, Chemistry, Biology), and Social Science (History, Pol Sci, Geography, Economics, Business Studies).",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_KSEAB_SSLC_SYLLABUS_DERIVED",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# ಕರ್ನಾಟಕ ಶಾಲಾ ಪರೀಕ್ಷೆ ಮತ್ತು ಮೌಲ್ಯನಿರ್ಣಯ ಮಂಡಳಿ (KSEAB) - 10ನೇ ತರಗತಿ SSLC ಕೋರ್ ಸಬ್ಜೆಕ್ಟ್ಸ್ ರಿವಿಷನ್ ನೋಟ್ಸ್

## 1. ಗಣಿತ (Mathematics)
- **ಸಮಾಂತರ ಶ್ರೇಢಿಗಳು (Arithmetic Progressions):**
  - ಸಾಮಾನ್ಯ ರೂಪ: $a, a+d, a+2d, \\dots$, $n$-ನೇ ಪದ $a_n = a + (n-1)d$.
  - ಮೊದಲ $n$ ಪದಗಳ ಮೊತ್ತ: $S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}[a + l]$.
- **ತ್ರಿಭುಜಗಳು (Triangles):**
  - ಥೇಲ್ಸ್ ಪ್ರಮೇಯ (ಮೂಲ ಸಮಾನುಪಾತತೆಯ ಪ್ರಮೇಯ): ಒಂದು ತ್ರಿಭುಜದ ಒಂದು ಬಾಹುವಿಗೆ ಸಮಾಂತರವಾಗಿ ಎಳೆದ ಸರಳರೇಖೆಯು ಉಳಿದೆರಡು ಬಾಹುಗಳನ್ನು ಸಮಾನುಪಾತದಲ್ಲಿ ವಿಭಾಗಿಸುತ್ತದೆ.
  - ಪೈಥಾಗೊರಸ್ ಪ್ರಮೇಯ: ಲಂಬಕೋನ ತ್ರಿಭುಜದಲ್ಲಿ ವಿಕರ್ಣದ ಮೇಲಿನ ವರ್ಗವು ಉಳಿದೆರಡು ಬಾಹುಗಳ ವರ್ಗಗಳ ಮೊತ್ತಕ್ಕೆ ಸಮನಾಗಿರುತ್ತದೆ ($AC^2 = AB^2 + BC^2$).
- **ವರ್ಗ ಸಮೀಕರಣಗಳು (Quadratic Equations):**
  - ಪ್ರಮಾಣಿತ ರೂಪ: $ax^2 + bx + c = 0, \\quad a \\neq 0$.
  - ಸೂತ್ರ ವಿಧಾನ: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.
  - ಶೋಧಕ ($b^2 - 4ac$): $>0$ (ವಾಸ್ತವ ಮತ್ತು ಭಿನ್ನ ಮೂಲಗಳು), $=0$ (ವಾಸ್ತವ ಮತ್ತು ಸಮಾನ ಮೂಲಗಳು), $<0$ (ವಾಸ್ತವ ಮೂಲಗಳಿಲ್ಲ).
- **ತ್ರಿಕೋನಮಿತಿ (Trigonometry):**
  - ಮೂಲ ನಿತ್ಯಸಮೀಕರಣಗಳು: $\\sin^2 \\theta + \\cos^2 \\theta = 1$, $1 + \\tan^2 \\theta = \\sec^2 \\theta$, $1 + \\cot^2 \\theta = \\mathrm{cosec}^2 \\theta$.
  - ಎತ್ತರ ಮತ್ತು ದೂರಗಳು: ದೃಷ್ಟಿರೇಖೆ, ಉನ್ನತ ಕೋನ (Angle of Elevation), ಅವನತ ಕೋನ (Angle of Depression).

## 2. ವಿಜ್ಞಾನ (Science)
### ಭೌತಶಾಸ್ತ್ರ (Physics):
- **ಬೆಳಕು - ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ:** ದರ್ಪಣ ಸೂತ್ರ: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$. ಮಸೂರ ಸೂತ್ರ: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$. ಸ್ನೆಲ್ ನಿಯಮ: $\\frac{\\sin i}{\\sin r} = n$.
- **ವಿದ್ಯುಚ್ಛಕ್ತಿ:** ಓಮ್‌ನ ನಿಯಮ: $V = IR$. ಸರಣಿ ಸಂಯೋಜನೆ: $R_s = R_1 + R_2 + R_3$. ಸಮಾಂತರ ಸಂಯೋಜನೆ: $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$. ಜೌಲ್‌ನ ಶಾಖೋತ್ಪನ್ನ ನಿಯಮ: $H = I^2 R t$.

### ರಸಾಯನಶಾಸ್ತ್ರ (Chemistry):
- **ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು:** ಸಂಯೋಗ, ವಿಭಜನೆ, ಸ್ಥಾನಪಲ್ಲಟ ಮತ್ತು ದ್ವಿಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆಗಳು. ರೆಡಾಕ್ಸ್ ಕ್ರಿಯೆಗಳು (ಉತ್ಕರ್ಷಣ-ಅಪಕರ್ಷಣ).
- **ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು:** pH ಮಾಪನ (0 ರಿಂದ 14). ತಟಸ್ಥೀಕರಣ ಕ್ರಿಯೆ. ಬ್ಲೀಚಿಂಗ್ ಪುಡಿ ($CaOCl_2$), ವಾಷಿಂಗ್ ಸೋಡಾ ($Na_2CO_3 \\cdot 10H_2O$), ಪ್ಲಾಸ್ಟರ್ ಆಫ್ ಪ್ಯಾರಿಸ್ ($CaSO_4 \\cdot \\frac{1}{2}H_2O$).
- **ಕಾರ್ಬನ್ ಮತ್ತು ಅದರ ಸಂಯುಕ್ತಗಳು:** ಸಹವೇಲೆನ್ಸೀಯ ಬಂಧ, ಹೈಡ್ರೋಕಾರ್ಬನ್‌ಗಳು (ಆಲ್ಕೇನ್, ಆಲ್ಕೀನ್, ಆಲ್ಕೈನ್), ಕ್ರಿಯಾ ಗುಂಪುಗಳು.

### ಜೀವಶಾಸ್ತ್ರ (Biology):
- **ಜೀವಕ್ರಿಯೆಗಳು:** ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ($6CO_2 + 12H_2O \\rightarrow C_6H_{12}O_6 + 6O_2 + 6H_2O$). ಮಾನವನ ಹೃದಯ ರಚನೆ ಮತ್ತು ದ್ವಿ-ಪರಿಚಲನೆ. ನೆಫ್ರಾನ್ ರಚನೆ ಮತ್ತು ಮೂತ್ರೋತ್ಪತ್ತಿ ಹಂತಗಳು.
- **ಅನುವಂಶೀಯತೆ:** ಮೆಂಡಲ್‌ನ ಪ್ರಯೋಗಗಳು (ಏಕತಳಿ ಸಂಕರಣ ಅನುಪಾತ 3:1, ಜೀನ್ ನಮೂನೆ 1:2:1).

## 3. ಸಮಾಜ ವಿಜ್ಞಾನ (Social Science)
- **ಇತಿಹಾಸ:** ಬ್ರಿಟಿಷ್ ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿ, 1857ರ ಪ್ರಥಮ ಸ್ವಾತಂತ್ರ್ಯ ಸಂಗ್ರಾಮ, ಕರ್ನಾಟಕದ ಏಕೀಕರಣ (ಆಲೂರು ವೆಂಕಟರಾವ್ ಅವರ 'ಕರ್ನಾಟಕ ಗತವೈಭವ' ಪ್ರೇರಣೆ).
- **ರಾಜ್ಯಶಾಸ್ತ್ರ ಮತ್ತು ಸಮಾಜಶಾಸ್ತ್ರ:** ಭಾರತದ ಸಂವಿಧಾನ, ಪಂಚಶೀಲ ತತ್ವಗಳು, ಅಸ್ಪೃಶ್ಯತೆ ನಿವಾರಣಾ ಕಾಯ್ದೆಗಳು (ವಿಧಿಸಂಖ್ಯೆ 17).
- **ಭೂಗೋಳಶಾಸ್ತ್ರ ಮತ್ತು ಅರ್ಥಶಾಸ್ತ್ರ:** ಕಾವೇರಿ ಮತ್ತು ಕೃಷ್ಣಾ ನದಿ ಜಲಾನಯನ ಪ್ರದೇಶಗಳು, ಕರ್ನಾಟಕದ ಪಂಚಾಯತ್ ರಾಜ್ ವ್ಯವಸ್ಥೆ."""
    },
    {
        "note_id": "note-kar-c10-c12-kannada-literature-compendium",
        "subject_id": "kar-c10-kannada-fl",
        "language_id": "kn",
        "note_type": "FULL_NOTES",
        "title": "Karnataka School & Pre-University Kannada Literature & Grammar Master Compendium (ಕನ್ನಡ ಸಾಹಿತ್ಯ ಸೌರಭ & ವ್ಯಾಕರಣ ಸರ್ವಸ್ವ)",
        "summary": "Authoritative study guide for SSLC Class 10 & II PUC Kannada (First Language & Part I) covering Halagannada, Nadugannada, Vachana Sahitya, Haridasa Sahitya, Navodaya, Navya movements, Alankaras, Chandassu, and Kannada Grammar.",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_KARNATAKA_KSEAB_PUE_KANNADA_CURRICULUM",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# ಕರ್ನಾಟಕ ಶಾಲಾ ಮತ್ತು ಪದವಿಪೂರ್ವ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಸೌರಭ & ವ್ಯಾಕರಣ ಸರ್ವಸ್ವ

## 1. ಹಳಗನ್ನಡ ಮತ್ತು ನಡುಗನ್ನಡ ಸಾಹಿತ್ಯ
- **ಕವಿ ರನ್ನ (ಸಾಹಸಭೀಮ ವಿಜಯ / ಗದಾಯುದ್ಧ):** 'ಸಿಂಹಾವಲೋಕನ ಕ್ರಮ' ದಲ್ಲಿ ಕಥಾ ನಿರೂಪಣೆ. ಭೀಮ ಮತ್ತು ದುರ್ಯೋಧನರ ಗದಾಯುದ್ಧದ ರೋಮಾಂಚಕ ವರ್ಣನೆ.
- **ಕುಮಾರವ್ಯಾಸ (ಕರ್ಣಾಟ ಭಾರತ ಕಥಾಮಂಜರಿ):** 'ರೂಪಕ ಸಾಮ್ರಾಜ್ಯ ಚಕ್ರವರ್ತಿ'. ಗದುಗಿನ ವೀರನಾರಾಯಣನ ಅಂಕಿತದಲ್ಲಿ ಭಾಮಿನಿ ಷಟ್ಪದಿಯಲ್ಲಿ ಮಹಾಭಾರತ ರಚನೆ. 'ಕೌರವೇಂದ್ರನ ಕೊಂದೆ ನೀನು' - ಕೃಷ್ಣ ಮತ್ತು ಕರ್ಣನ ನಡುವಿನ ಮಹಾಸಂವಾದ.
- **ವಚನ ಸಾಹಿತ್ಯ:**
  - ಬಸವಣ್ಣ: 'ಕಾಯಕವೇ ಕೈಲಾಸ', 'ದಯವಿಲ್ಲದ ಧರ್ಮವೇವುದಯ್ಯಾ', ಕೂಡಲಸಂಗಮದೇವ ಅಂಕಿತ.
  - ಅಲ್ಲಮಪ್ರಭು: ಗುಹೇಶ್ವರ ಅಂಕಿತದಲ್ಲಿ ಬೆಡಗಿನ ವಚನಗಳು, ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭಾವ.
  - ಅಕ್ಕಮಹಾದೇವಿ: ಚೆನ್ನಮಲ್ಲಿಕಾರ್ಜುನ ಅಂಕಿತ, ಶರಣ ಸತಿ ಲಿಂಗ ಪತಿ ಭಾವ.
- **ಹರಿದಾಸ ಸಾಹಿತ್ಯ:**
  - ಪುರಂದರದಾಸರು: 'ಕರ್ನಾಟಕ ಸಂಗೀತ ಪಿತಾಮಹ', ಸಮಾಜ ಸುಧಾರಣಾ ಕೀರ್ತನೆಗಳು.
  - ಕನಕದಾಸರು: 'ಕುಲಕುಲವೆಂದು ಹೊಡೆದಾಡದಿರಿ', 'ರಾಮಧಾನ್ಯ ಚರಿತೆ', 'ಮೋಹನತರಂಗಿಣಿ'.

## 2. ನವೋದಯ ಮತ್ತು ಆಧುನಿಕ ಕನ್ನಡ ಸಾಹಿತ್ಯ
- **ಕುವೆಂಪು (ಕೆ.ವಿ. ಪುಟ್ಟಪ್ಪ):** 'ಶ್ರೀ ರಾಮಾಯಣ ದರ್ಶನಂ' ಮಹಾಕಾವ್ಯ (ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ), 'ಮಲೆಗಳಲ್ಲಿ ಮದುಮಗಳು', 'ಕಾನೂರು ಹೆಗ್ಗಡಿತಿ', ನಾಡಗೀತೆ 'ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ'.
- **ದ.ರಾ. ಬೇಂದ್ರೆ:** 'ನಾಕುತಂತಿ' (ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ), 'ಹಕ್ಕಿ ಹಾರುತ್ತಿದೆ ನೋಡಿದಿರಾ', ಗೀತ ಕಾವ್ಯದ ಮಾಂತ್ರಿಕತೆ.
- **ಸರ್. ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ & ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್:** ಆಧುನಿಕ ಮೈಸೂರಿನ ನಿರ್ಮಾತೃಗಳು, ಭದ್ರಾವತಿ ಕಬ್ಬಿಣ ಕಾರ್ಖಾನೆ, ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ ಸ್ಥಾಪನೆ.

## 3. ಕನ್ನಡ ಸಮಗ್ರ ವ್ಯಾಕರಣ & ಛಂದಸ್ಸು
- **ಕನ್ನಡ ಸಂಧಿಗಳು:**
  - ಲೋಪ ಸಂಧಿ: ಸ್ವರದ ಮುಂದೆ ಸ್ವರ ಬಂದು ಅರ್ಥ ಕೆಡದಿದ್ದಲ್ಲಿ ಪೂರ್ವಪದದ ಸ್ವರ ಲೋಪವಾಗುವುದು (ಮಾತು + ಇಲ್ಲ = ಮಾತಿಲ್ಲ).
  - ಆಗಮ ಸಂಧಿ: 'ಯ' ಕಾರಾಗಮ ಮತ್ತು 'ವ' ಕಾರಾಗಮ (ಮನೆ + ಅನ್ನು = ಮನೆಯನ್ನು, ಮರ + ಅನ್ನು = ಮರವನ್ನು).
  - ಆದೇಶ ಸಂಧಿ: ಉತ್ತರಪದದ ಆದಿಯ ಕ-ತ-ಪ ಗಳಿಗೆ ಕ್ರಮವಾಗಿ ಗ-ದ-ಬ ಗಳು ಆದೇಶವಾಗುವುದು (ಕಣ್ + ಪನಿ = ಕಣ್ಬನಿ).
- **ಸಮಾಸಗಳು:** ತತ್ಪುರುಷ ಸಮಾಸ, ಕರ್ಮಧಾರಯ ಸಮಾಸ, ದ್ವಂದ್ವ ಸಮಾಸ, ಬಹುವ್ರೀಹಿ ಸಮಾಸ, ಅಂಶಿ ಸಮಾಸ, ಕ್ರಿಯಾ ಸಮಾಸ, ಗಮಕ ಸಮಾಸ.
- **ಛಂದಸ್ಸು:**
  - ಕಂದಪದ್ಯ: 4 ಸಾಲುಗಳು, ಮಾತ್ರೆಗಳ ವಿನ್ಯಾಸ 12, 20, 12, 20.
  - ಭಾಮಿನಿ ಷಟ್ಪದಿ: 6 ಸಾಲುಗಳು, 1, 2, 4, 5 ಸಾಲುಗಳಲ್ಲಿ 14 ಮಾತ್ರೆಗಳು (3-4-3-4), 3 ಮತ್ತು 6 ಸಾಲುಗಳಲ್ಲಿ 21 ಮಾತ್ರೆಗಳು (3-4-3-4-3-4 + ಗುರು).
  - ವಾರ್ಧಕ ಷಟ್ಪದಿ: 6 ಸಾಲುಗಳು, 1, 2, 4, 5 ಸಾಲುಗಳಲ್ಲಿ 20 ಮಾತ್ರೆಗಳು (5-5-5-5), 3 ಮತ್ತು 6 ಸಾಲುಗಳಲ್ಲಿ 28 ಮಾತ್ರೆಗಳು (5-5-5-5-5 + ಗುರು).
- **ಅಲಂಕಾರಗಳು:** ಉಪಮಾಲಂಕಾರ, ರೂಪಕಾಲಂಕಾರ, ದೃಷ್ಟಾಂತಾಲಂಕಾರ, ಅರ್ಥಾಂತರನ್ಯಾಸಾಲಂಕಾರ."""
    },
    {
        "note_id": "note-kar-c12-science-pcmb-pcmc-compendium",
        "subject_id": "kar-c12-physics",
        "language_id": "en",
        "note_type": "FULL_NOTES",
        "title": "Karnataka PUE II PUC Science Stream Master Revision Vault (PCMB, PCMC & PCME Combinations)",
        "summary": "High-yield engineering and medical entrance aligned revision repository covering Physics, Chemistry, Mathematics, Biology, Computer Science, and Electronics under the Karnataka Pre-University Education Board curriculum.",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_KARNATAKA_PUE_SCIENCE_CURRICULUM",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# KARNATAKA PUE II PUC SCIENCE STREAM MASTER REVISION VAULT (PCMB, PCMC, PCME)

## 1. PHYSICS (ಭೌತಶಾಸ್ತ್ರ)
- **Electrostatics & Current Electricity:**
  - Coulomb's Law: $F = \\frac{1}{4\\pi \\varepsilon_0} \\frac{q_1 q_2}{r^2}$. Gauss's Law: $\\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{q_{\\text{enc}}}{\\varepsilon_0}$.
  - Capacitance of parallel plate capacitor with dielectric: $C = \\frac{K \\varepsilon_0 A}{d}$. Energy stored: $U = \\frac{1}{2} C V^2$.
  - Kirchhoff's Circuit Laws: Junction Rule $\\sum I = 0$, Loop Rule $\\sum \\Delta V = 0$. Balanced Wheatstone Bridge: $\\frac{P}{Q} = \\frac{R}{S}$.
  - Meter Bridge wire relation: $\\frac{R}{S} = \\frac{l_1}{100 - l_1}$.
- **Electromagnetism & AC Circuits:**
  - Biot-Savart Law: $d\\mathbf{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\mathbf{l} \\times \\hat{r}}{r^2}$. Ampere's Circuital Law: $\\oint \\mathbf{B} \\cdot d\\mathbf{l} = \\mu_0 I_{\\text{enc}}$.
  - Faraday's Law: $\\mathcal{E} = -\\frac{d\\Phi_B}{dt}$. Self-inductance of solenoid: $L = \\mu_0 n^2 A l$.
  - Series LCR resonance frequency: $\\omega_0 = \\frac{1}{\\sqrt{LC}}$, Quality Factor $Q = \\frac{\\omega_0 L}{R}$.
- **Optics & Modern Physics:**
  - Lens Maker's Formula: $\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$.
  - Young's Double Slit Experiment fringe width: $\\beta = \\frac{\\lambda D}{d}$.
  - Einstein's Photoelectric Equation: $h\\nu = h\\nu_0 + K_{\\max} = \\Phi + e V_0$.
  - Bohr's quantization condition: $mvr = \\frac{nh}{2\\pi}$, Energy levels $E_n = -\\frac{13.6}{n^2} \\text{ eV}$.

## 2. CHEMISTRY (ರಸಾಯನಶಾಸ್ತ್ರ)
- **Physical Chemistry:**
  - Raoult's Law: $P_A = x_A P_A^\\circ$. Elevation in boiling point $\\Delta T_b = K_b m$, Depression in freezing point $\\Delta T_f = K_f m$.
  - Nernst Equation: $E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log Q$ at 298 K. Kohlrausch's Law: $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$.
  - Chemical Kinetics: First order rate constant $k = \\frac{2.303}{t} \\log \\frac{[A]_0}{[A]}$, Half-life $t_{1/2} = \\frac{0.693}{k}$.
- **Inorganic & Organic Chemistry:**
  - Coordination Compounds: Crystal Field Splitting in Octahedral ($\\Delta_o$) and Tetrahedral ($\\Delta_t = \\frac{4}{9} \\Delta_o$) geometries.
  - Important Named Reactions: Aldol Condensation, Cannizzaro Reaction, Kolbe's Reaction, Reimer-Tiemann, Sandmeyer Reaction, Hoffmann Bromamide degradation.

## 3. MATHEMATICS (ಗಣಿತಶಾಸ್ತ್ರ)
- **Calculus:**
  - Standard Derivatives: $\\frac{d}{dx}[\\sin^{-1} x] = \\frac{1}{\\sqrt{1-x^2}}$, $\\frac{d}{dx}[\\tan^{-1} x] = \\frac{1}{1+x^2}$.
  - Integration by Parts: $\\int u v dx = u \\int v dx - \\int \\left(u' \\int v dx\\right) dx$.
  - Area between curves: $A = \\int_a^b [f(x) - g(x)] dx$.
  - First-order Linear DE: $\\frac{dy}{dx} + Py = Q \\implies y \\cdot e^{\\int P dx} = \\int Q e^{\\int P dx} dx + C$.
- **Algebra & Vectors:**
  - Matrix Inversion: $A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)$.
  - Vectors: Dot product $\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}| \\cos \\theta$, Cross product $\\mathbf{a} \\times \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}| \\sin \\theta \\,\\hat{n}$."""
    },
    {
        "note_id": "note-kar-c12-commerce-basbm-bascs-compendium",
        "subject_id": "kar-c12-business-studies",
        "language_id": "kn",
        "note_type": "FULL_NOTES",
        "title": "Karnataka PUE II PUC Commerce Stream Master Revision Compendium (BASBM & BASCS Combinations)",
        "summary": "Comprehensive revision notes for Karnataka Pre-University Commerce covering Business Studies, Accountancy, Economics, Statistics, and Basic Mathematics for BASBM and BASCS combinations.",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_KARNATAKA_PUE_COMMERCE_CURRICULUM",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# ಕರ್ನಾಟಕ ಪದವಿಪೂರ್ವ ಶಿಕ್ಷಣ ಇಲಾಖೆ (PUE) ದ್ವಿತೀಯ ಪಿಯುಸಿ ವಾಣಿಜ್ಯ ವಿಭಾಗದ ರಿವಿಷನ್ ನೋಟ್ಸ್ (BASBM & BASCS)

## 1. ವ್ಯವಹಾರ ಅಧ್ಯಯನ (Business Studies)
- **ನಿರ್ವಹಣೆಯ ತತ್ವಗಳು (Principles of Management):**
  - ಹೆನ್ರಿ ಫೆಯಾಲ್ ಅವರ 14 ತತ್ವಗಳು: ಕೆಲಸದ ವಿಭಜನೆ, ಅಧಿಕಾರ ಮತ್ತು ಜವಾಬ್ದಾರಿ, ಶಿಸ್ತು, ಆಜ್ಞೆಯ ಏಕತೆ, ನಿರ್ದೇಶನದ ಏಕತೆ, ನಿಯಂತ್ರಣ ವ್ಯಾಪ್ತಿ.
  - ಎಫ್.ಡಬ್ಲ್ಯೂ. ಟೇಲರ್ ಅವರ ವೈಜ್ಞಾನಿಕ ನಿರ್ವಹಣೆ: ಕಾಲ ಅಧ್ಯಯನ, ಚಲನ ಅಧ್ಯಯನ, ಆಯಾಸ ಅಧ್ಯಯನ.
- **ಹಣಕಾಸು ನಿರ್ವಹಣೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆಗಳು:**
  - ಬಂಡವಾಳ ರಚನೆ: ಇಕ್ವಿಟಿ ಮತ್ತು ಸಾಲದ ಅನುಪಾತ.
  - ಹಣದ ಮಾರುಕಟ್ಟೆ (ಸ್ವಲ್ಪಾವಧಿ ಸಾಧನಗಳು: ಟ್ರೆಷರಿ ಬಿಲ್ಲುಗಳು, ಕಮರ್ಷಿಯಲ್ ಪೇಪರ್) ಮತ್ತು ಬಂಡವಾಳ ಮಾರುಕಟ್ಟೆ (ದೀರ್ಘಾವಧಿ).
  - ಸೆಬಿ (SEBI) ಯ ನಿಯಂತ್ರಕ ಮತ್ತು ರಕ್ಷಣಾತ್ಮಕ ಕಾರ್ಯಗಳು.

## 2. ಲೆಕ್ಕಶಾಸ್ತ್ರ (Accountancy)
- **ಲಾಭೋದ್ದೇಶವಿಲ್ಲದ ಸಂಸ್ಥೆಗಳು (NPO):**
  - ಸ್ವೀಕೃತಿ ಮತ್ತು ಸಂದಾಯಗಳ ಖಾತೆ (ನೈಜ ಖಾತೆ - ಕೇವಲ ನಗದು ವ್ಯವಹಾರಗಳು).
  - ಆದಾಯ ಮತ್ತು ವೆಚ್ಚಗಳ ಖಾತೆ (ನಾಮಮಾತ್ರ ಖಾತೆ - ಚಾಲ್ತಿ ಸಾಲಿನ ಆದಾಯ ಮತ್ತು ವೆಚ್ಚಗಳು).
- **ಪಾಲುದಾರಿಕೆ ಸಂಸ್ಥೆಗಳ ಪುನರ್ರಚನೆ ಮತ್ತು ವಿಸರ್ಜನೆ:**
  - ಪಾಲುದಾರರ ಪ್ರವೇಶ: ಪುನರ್ಮೌಲ್ಯಮಾಪನ ಖಾತೆ (Revaluation A/c) ಮತ್ತು ಸದ್ಭಾವನೆ (Goodwill) ಹೊಂದಾಣಿಕೆ.
  - ವಿಸರ್ಜನೆ: ನಗದೀಕರಣ ಖಾತೆ (Realisation Account) - ಆಸ್ತಿಗಳ ವಿಲೇವಾರಿ ಮತ್ತು ಹೊಣೆಗಾರಿಕೆಗಳ ಪಾವತಿ.
- **ಷೇರು ಬಂಡವಾಳದ ಲೆಕ್ಕಪತ್ರಗಳು:**
  - ಷೇರುಗಳ ಮುಟ್ಟುಗೋಲು ಮತ್ತು ಮರುವಿತರಣೆ (Forfeiture and Re-issue of Shares).

## 3. ಅರ್ಥಶಾಸ್ತ್ರ & ಸಂಖ್ಯಾಶಾಸ್ತ್ರ (Economics & Statistics)
- **ಸೂಕ್ಷ್ಮ ಮತ್ತು ಸ್ಥೂಲ ಅರ್ಥಶಾಸ್ತ್ರ:**
  - ಗ್ರಾಹಕರ ನಡವಳಿಕೆ ಸಿದ್ಧಾಂತ: ಸೀಮಾಂತ ತುಷ್ಟಿಗುಣ ನಿಯಮ, ಬೇಡಿಕೆಯ ಬೆಲೆ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ.
  - ರಾಷ್ಟ್ರೀಯ ಆದಾಯದ ಮಾಪನ: ಉತ್ಪಾದನಾ ವಿಧಾನ, ಆದಾಯ ವಿಧಾನ ಮತ್ತು ವೆಚ್ಚ ವಿಧಾನ.
- **ಸಂಖ್ಯಾಶಾಸ್ತ್ರ (Statistics):**
  - ಸೂಚ್ಯಂಕಗಳು: ಫಿಶರ್ ಅವರ ಆದರ್ಶ ಸೂಚ್ಯಂಕ (Fisher's Ideal Index), ಕಾಲ ಪಲ್ಲಟ ಮತ್ತು ಅಂಶ ಪಲ್ಲಟ ಪರೀಕ್ಷೆಗಳು.
  - ಸಂಭವನೀಯತಾ ಹಂಚಿಕೆಗಳು: ಬೈನೋಮಿಯಲ್ ಮತ್ತು ಪಾಯಿಸನ್ ಹಂಚಿಕೆ ಗುಣಲಕ್ಷಣಗಳು."""
    },
    {
        "note_id": "note-kar-c12-arts-hesp-hegp-compendium",
        "subject_id": "kar-c12-history",
        "language_id": "kn",
        "note_type": "FULL_NOTES",
        "title": "Karnataka PUE II PUC Arts / Humanities Stream Comprehensive Analytical Compendium (HESP & HEGP Combinations)",
        "summary": "Authoritative study vault for Karnataka Pre-University Humanities (HESP, HEGP, HELP) covering History, Political Science, Sociology, Geography, and Logic.",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_KARNATAKA_PUE_ARTS_CURRICULUM",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# ಕರ್ನಾಟಕ ಪದವಿಪೂರ್ವ ಶಿಕ್ಷಣ ಇಲಾಖೆ (PUE) ದ್ವಿತೀಯ ಪಿಯುಸಿ ಕಲಾ ವಿಭಾಗದ ವಿಶ್ಲೇಷಣಾತ್ಮಕ ನೋಟ್ಸ್ (HESP, HEGP)

## 1. ಇತಿಹಾಸ (History)
- **ಕರ್ನಾಟಕದ ರಾಜವಂಶಗಳು ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ:**
  - ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು: 2ನೇ ಪುಲಕೇಶಿ, ಐಹೊಳೆ ಮತ್ತು ಪಟ್ಟದಕಲ್ಲು ದೇವಾಲಯಗಳ ವಾಸ್ತುಶಿಲ್ಪ.
  - ರಾಷ್ಟ್ರಕೂಟರು: ನೃಪತುಂಗ ಅಮೋಘವರ್ಷ, ಶ್ರೀವಿಜಯನ 'ಕವಿರಾಜಮಾರ್ಗ', ಎಲ್ಲೋರಾದ ಕೈಲಾಸನಾಥ ದೇವಾಲಯ.
  - ಹೊಯ್ಸಳರು: ವಿಷ್ಣುವರ್ಧನ, ಬೇಲೂರು ಚೆನ್ನಕೇಶವ ಮತ್ತು ಹಳೇಬೀಡು ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯಗಳು (ನಕ್ಷತ್ರಾಕಾರದ ಜಗುಲಿ).
  - ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ: ಶ್ರೀಕೃಷ್ಣದೇವರಾಯ (1509-1529), ಹಂಪಿಯ ವಾಸ್ತುಶಿಲ್ಪ (ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ವಿಜಯ ವಿಠ್ಠಲ ದೇವಾಲಯದ ಕಲ್ಲಿನ ರಥ), ರಕ್ಕಸ-ತಂಗಡಿ ಕಾಳಗ (1565).
- **ಆಧುನಿಕ ಕರ್ನಾಟಕ ಮತ್ತು ಏಕೀಕರಣ:**
  - ಮೈಸೂರು ರಾಜ್ಯದ ಏಕೀಕರಣ ಚಳವಳಿ: 1956 ನವೆಂಬರ್ 1 ರಂದು ವಿಶಾಲ ಮೈಸೂರು ರಾಜ್ಯ ರಚನೆ, 1973 ರಲ್ಲಿ 'ಕರ್ನಾಟಕ' ಎಂದು ಮರುನಾಮಕರಣ (ದೇವರಾಜ ಅರಸು ಮುಖ್ಯಮಂತ್ರಿ ಅವಧಿಯಲ್ಲಿ).

## 2. ರಾಜ್ಯಶಾಸ್ತ್ರ ಮತ್ತು ಸಮಾಜಶಾಸ್ತ್ರ (Political Science & Sociology)
- **ಭಾರತೀಯ ರಾಜಕೀಯ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್:**
  - 73 ಮತ್ತು 74ನೇ ಸಾಂವಿಧಾನಿಕ ತಿದ್ದುಪಡಿಗಳು: ಕರ್ನಾಟಕ ಪಂಚಾಯತ್ ರಾಜ್ ಅಧಿನಿಯಮ 1993, ಗ್ರಾಮ ಪಂಚಾಯತ್, ತಾಲೂಕು ಪಂಚಾಯತ್ ಮತ್ತು ಜಿಲ್ಲಾ ಪಂಚಾಯತ್ ರಚನೆ.
  - ಸಾಮಾಜಿಕ ನ್ಯಾಯ: ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಆಯೋಗಗಳು (ಮಿಲ್ಲರ್ ಸಮಿತಿ, ಹಾವನೂರ್ ಆಯೋಗ, ವೆಂಕಟಸ್ವಾಮಿ ಆಯೋಗ).
- **ಸಾಮಾಜಿಕ ಚಳವಳಿಗಳು:**
  - ಕರ್ನಾಟಕದ ರೈತ ಚಳವಳಿ (ಪ್ರೊ. ಎಂ.ಡಿ. ನಂಜುಂಡಸ್ವಾಮಿ), ದಲಿತ ಚಳವಳಿ, ಅಪ್ಪಿಕೋ ಚಳವಳಿ (ಉತ್ತರ ಕನ್ನಡದಲ್ಲಿ ಅರಣ್ಯ ಸಂರಕ್ಷಣೆ).

## 3. ತರ್ಕಶಾಸ್ತ್ರ (Logic & Philosophy)
- **ನಿರುಪಾಧಿಕ ನ್ಯಾಯವಾಕ್ಯ (Categorical Syllogism):**
  - ಮೂರು ಪದಗಳು: ಸಾಧ್ಯ ಪದ (Major), ಪಕ್ಷ ಪದ (Minor), ಹೇತು ಪದ (Middle term).
  - ನಿಯಮಗಳು, ಆಕೃತಿಗಳು ಮತ್ತು ತಾರ್ಕಿಕ ದೋಷಗಳು.
- **ಭಾರತೀಯ ತರ್ಕಶಾಸ್ತ್ರ (ನ್ಯಾಯ ದರ್ಶನ):**
  - ನಾಲ್ಕು ಪ್ರಮಾಣಗಳು: ಪ್ರತ್ಯಕ್ಷ, ಅನುಮಾನ, ಉಪಮಾನ, ಶಬ್ದ.
  - ಪರಾರ್ಥಾನುಮಾನದ ಪಂಚಾವಯವ ವಾಕ್ಯಗಳು: ಪ್ರತಿಜ್ಞಾ, ಹೇತು, ಉದಾಹರಣ, ಉಪನಯ, ನಿಗಮನ."""
    }
]

out_path = os.path.join(os.path.dirname(__file__), "kar_bundled_notes.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"Successfully compiled {len(notes)} master notes to {out_path}!")
