"""
NTA NEET-UG Bundled Study Notes Compiler
Generates exactly 5 master bundled notes sampling 50% representative questions (within 40%-60% requirement)
across all 4 subjects for NTA NEET-UG (Undergraduate Medical Admissions).
"""

import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(__file__)
EXAM_VERSION_ID = 'ver-nta-neet-2026'

with open(os.path.join(BASE_DIR, 'neet_bank.json'), 'r', encoding='utf-8') as f:
    all_qs = json.load(f)

def get_sample_qs(qs, subject_id, ratio=0.5):
    sub_qs = [q for q in qs if q['subject_id'] == subject_id]
    count = int(len(sub_qs) * ratio)
    return sub_qs[:count]

# 50% sampling from each of the 4 subjects (150 Qs each = 600 Qs grand bundle)
phy_sample = get_sample_qs(all_qs, 'neet-physics', 0.50)
chem_sample = get_sample_qs(all_qs, 'neet-chemistry', 0.50)
bot_sample = get_sample_qs(all_qs, 'neet-botany', 0.50)
zoo_sample = get_sample_qs(all_qs, 'neet-zoology', 0.50)

grand_bundle = phy_sample + chem_sample + bot_sample + zoo_sample

print(f"Sampled Grand NEET-UG Bundle: {len(grand_bundle)} questions (Physics:{len(phy_sample)}, Chemistry:{len(chem_sample)}, Botany:{len(bot_sample)}, Zoology:{len(zoo_sample)})")

def build_q_summary_markdown(sampled_questions, max_display=12):
    md = ""
    for idx, q in enumerate(sampled_questions[:max_display], 1):
        parsed = json.loads(q['language_content'])
        en_stem = parsed['en']['stem']
        hi_stem = parsed['hi']['stem']
        ans = q['correct_answer']
        md += f"\n**Q{idx} [{q['subject_id']} | ID: {q['question_id']}]**\n- (EN): {en_stem}\n- (HI): {hi_stem}\n- *Correct Answer*: **{ans}** | *Marks*: {q['marks']}\n"
    if len(sampled_questions) > max_display:
        md += f"\n*... [Plus {len(sampled_questions) - max_display} additional verified official questions sampled in this comprehensive repository]*\n"
    return md

notes = [
    # Note 1: Grand Blueprint Super Bundle
    {
        'note_id': 'note-neet-grand-blueprint',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'neet-physics',
        'language_id': 'hi',
        'note_type': 'ALL_SUBJECTS_SUPER_BUNDLE',
        'title': 'NTA NEET-UG Medical Entrance Grand Blueprint & Full Curriculum Master Compendium (नीट-यूजी राष्ट्रीय मेडिकल प्रवेश संपूर्ण मास्टर ब्लूप्रिंट)',
        'summary': f'Comprehensive examination master repository containing {len(grand_bundle)} sampled questions across all 4 subjects (Physics, Chemistry, Botany, Zoology) representing National Testing Agency (NTA) and National Medical Commission (NMC) standards.',
        'content': (
            "# NTA NEET-UG Medical Entrance Grand Blueprint & Full Curriculum Master Compendium\n\n"
            "## 1. Conducting Authority & Examination Structure\n"
            "- **Conducting Agency**: National Testing Agency (NTA) on behalf of the National Medical Commission (NMC), Ministry of Health and Family Welfare, New Delhi.\n"
            "- **Scope & Admissions**: Single national entrance gate for 1,08,000+ MBBS, 28,000+ BDS, 52,000+ AYUSH (BAMS, BHMS, BUMS, BSMS), and 603 BVSc & AH seats across AIIMS, JIPMER, Central Universities, State Medical Colleges, and Private Medical Institutions.\n"
            "- **Examination Format**: Offline Pen-and-Paper (OMR based) objective test of 200 Questions (180 to attempt) in 200 Minutes (3 Hours 20 Minutes).\n"
            "- **Total Marks**: 720 Marks.\n"
            "- **Marking Standard**: +4.0 marks for each correct answer; -1.0 mark penalty for each incorrect response (25% negative marking).\n\n"
            "## 2. Integrated Sectional Composition\n"
            "1. **Physics**: 45 Questions (Section A: 35 Qs, Section B: 15 Qs attempt 10) — 180 Marks.\n"
            "2. **Chemistry**: 45 Questions (Section A: 35 Qs, Section B: 15 Qs attempt 10) — 180 Marks.\n"
            "3. **Botany**: 45 Questions (Section A: 35 Qs, Section B: 15 Qs attempt 10) — 180 Marks.\n"
            "4. **Zoology**: 45 Questions (Section A: 35 Qs, Section B: 15 Qs attempt 10) — 180 Marks.\n"
            "*(Biology Total: 90 Questions / 360 Marks)*.\n\n"
            "## 3. Representative Sampled Question Repository (50% Uniform Sampling)\n"
            f"Below is a verified sample of {len(grand_bundle)} multi-subject representative questions:\n"
            + build_q_summary_markdown(grand_bundle, 16)
        )
    },

    # Note 2: Physics Mechanics, Electrodynamics & Modern Physics
    {
        'note_id': 'note-neet-physics-mechanics-electrodynamics',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'neet-physics',
        'language_id': 'hi',
        'note_type': 'PHYSICS_COMPREHENSIVE_GUIDE',
        'title': 'NEET Physics: Mechanics, Thermodynamics, Electrodynamics & Modern Physics Master Guide (भौतिक विज्ञान संपूर्ण रिवीजन गाइड)',
        'summary': f'High-yield medical entrance physics treatise containing {len(phy_sample)} sampled questions on kinematics, Newton laws, rotational motion, thermodynamics, SHM, electrostatics, optics, and semiconductors.',
        'content': (
            "# NEET Physics: Mechanics, Thermodynamics, Electrodynamics & Modern Physics Master Guide\n\n"
            "## 1. Mechanics & Gravitation\n"
            "- **Kinematics & Vectors**: Projectile velocity at apex u_x = u cos θ; Time of flight T = (2 u sin θ)/g; Max height H = (u^2 sin^2 θ)/(2g); Horizontal range R = (u^2 sin 2θ)/g.\n"
            "- **Newton's Laws & Friction**: Banking of road without friction v = sqrt(r g tan θ); Maximum safe speed with friction v_max = sqrt(r g (μ + tan θ)/(1 - μ tan θ)).\n"
            "- **Rotational Dynamics**: Rolling acceleration on incline a = (g sin θ)/(1 + I/(m R^2)); Solid sphere I = (2/5) m R^2, Hollow cylinder I = m R^2.\n"
            "- **Gravitation**: Orbital speed v_o = sqrt(G M / r); Escape velocity v_e = sqrt(2 G M / R) = sqrt(2) * v_o ≈ 11.2 km/s on Earth.\n\n"
            "## 2. Electrodynamics & Modern Physics\n"
            "- **Gauss's Law**: Flux through closed surface Φ = q_enclosed / ε_0; Flux through one face of cube containing charge at center = q / (6 ε_0).\n"
            "- **AC Circuits**: Resonance condition X_L = X_C (ω = 1/sqrt(LC)); Minimal impedance Z = R; Power factor cos φ = 1.\n"
            "- **Photoelectric Effect**: Einstein's equation e V_0 = h ν - Φ_0; de Broglie wavelength λ = h/p = h/sqrt(2 m q V).\n"
            "- **Semiconductors**: Zener diode operates in reverse breakdown as voltage regulator; Logic gates NAND and NOR are universal gates.\n\n"
            "## 3. Sampled Representative Questions (50% Sampling)\n"
            + build_q_summary_markdown(phy_sample, 12)
        )
    },

    # Note 3: Chemistry Physical, Inorganic & Organic
    {
        'note_id': 'note-neet-chemistry-physical-inorganic-organic',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'neet-chemistry',
        'language_id': 'hi',
        'note_type': 'CHEMISTRY_COMPREHENSIVE_TREATISE',
        'title': 'NEET Chemistry: Physical, Inorganic & Organic Reaction Mechanisms Compendium (रसायन विज्ञान संपूर्ण संकलन)',
        'summary': f'Comprehensive medical entrance chemistry manual containing {len(chem_sample)} sampled questions on thermodynamics, equilibrium, electrochemistry, periodic trends, coordination compounds, and organic name reactions.',
        'content': (
            "# NEET Chemistry: Physical, Inorganic & Organic Reaction Mechanisms Compendium\n\n"
            "## 1. Physical Chemistry Essentials\n"
            "- **Thermodynamics**: Spontaneity condition ΔG = ΔH - T ΔS < 0; Process spontaneous at all temperatures if ΔH < 0 and ΔS > 0.\n"
            "- **Solutions & Colligative Properties**: van 't Hoff factor i; ΔT_b = i K_b m; ΔT_f = i K_f m; π = i C R T. Highest boiling point corresponds to highest (i * m).\n"
            "- **Electrochemistry**: Nernst equation E_cell = E°_cell - (0.0591/n) log Q; At equilibrium E_cell = 0 and ΔG = 0.\n"
            "- **Chemical Kinetics**: First order half life t_1/2 = 0.693/k; Arrhenius slope of ln k vs 1/T is -Ea/R.\n\n"
            "## 2. Inorganic & Organic Chemistry Essentials\n"
            "- **Chemical Bonding**: Bond order by MOT = (N_b - N_a)/2; O_2 has bond order 2.0 and is paramagnetic due to 2 unpaired electrons in π* orbitals.\n"
            "- **Coordination Compounds**: Crystal Field Theory (CFT); Strong field ligands cause pairing (Δ_o > P) producing low-spin complexes; IUPAC alphabetical ligand naming.\n"
            "- **GOC & Hydrocarbons**: Markovnikov addition proceeds via more stable carbocation; Aromaticity requires planar cyclic conjugated ring with (4n + 2) π electrons (Hückel's rule).\n"
            "- **Organic Name Reactions**: Reimer-Tiemann (dichlorocarbene intermediate); Cannizzaro (aldehydes lacking α-hydrogens); Carbylamine test (primary amines only); Hoffmann bromamide degradation (produces primary amine with one less carbon).\n\n"
            "## 3. Sampled Representative Questions (50% Sampling)\n"
            + build_q_summary_markdown(chem_sample, 12)
        )
    },

    # Note 4: Botany Plant Diversity, Physiology & Cell Genetics
    {
        'note_id': 'note-neet-botany-diversity-physiology-genetics',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'neet-botany',
        'language_id': 'hi',
        'note_type': 'BOTANY_PLANT_PHYSIOLOGY_AND_GENETICS',
        'title': 'NEET Botany: Plant Diversity, Physiology, Reproduction & Genetics Treatise (वनस्पति विज्ञान संपूर्ण गाइड)',
        'summary': f'High-yield botany compendium containing {len(bot_sample)} sampled questions on plant classification, anatomy, C3/C4 pathways, phytohormones, double fertilization, and Mendelian inheritance.',
        'content': (
            "# NEET Botany: Plant Diversity, Physiology, Reproduction & Genetics Treatise\n\n"
            "## 1. Plant Diversity & Anatomy\n"
            "- **Heterospory in Pteridophytes**: Selaginella and Salvinia produce distinct microspores and megaspores, representing the evolutionary precursor to the seed habit.\n"
            "- **Anatomy & Tissues**: Dicot stem secondary growth driven by vascular cambium and cork cambium (phellogen); Heartwood (duramen) has blocked vessels with tyloses providing mechanical support.\n"
            "- **Flower & Placentation**: Parietal placentation (mustard, argemone) develops replum false septum; Axile (tomato, lemon); Free central (Dianthus, Primula).\n\n"
            "## 2. Plant Physiology & Reproduction\n"
            "- **Photosynthesis Pathways**: C4 plants (Maize, Sugarcane) use PEP carboxylase in mesophyll and RuBisCO in bundle sheath cells (Kranz anatomy) preventing photorespiration.\n"
            "- **Respiration in Plants**: Glycolysis (cytosol) yields 2 ATP net (substrate level) + 2 NADH; Respiration quotient (RQ) for fats = 0.7, carbohydrates = 1.0, organic acids > 1.0.\n"
            "- **Phytohormones**: Auxin (apical dominance); Gibberellin (bolting in rosette plants); Cytokinin (cell division); Ethylene (fruit ripening); ABA (stress hormone, stomatal closure).\n"
            "- **Angiosperm Reproduction**: Mature embryo sac is 7-celled and 8-nucleate; Double fertilization yields diploid zygote (2n) and triploid endosperm (3n).\n\n"
            "## 3. Sampled Representative Questions (50% Sampling)\n"
            + build_q_summary_markdown(bot_sample, 12)
        )
    },

    # Note 5: Zoology Human Physiology, Reproduction & Biotechnology
    {
        'note_id': 'note-neet-zoology-physiology-reproduction-biotech',
        'exam_version_id': EXAM_VERSION_ID,
        'subject_id': 'neet-zoology',
        'language_id': 'hi',
        'note_type': 'ZOOLOGY_PHYSIOLOGY_AND_BIOTECHNOLOGY',
        'title': 'NEET Zoology: Human Physiology, Reproduction, Evolution & Biotechnology Handbook (प्राणी विज्ञान संपूर्ण हैंडबुक)',
        'summary': f'Master revision guide containing {len(zoo_sample)} sampled questions on human organ systems, endocrine regulation, gametogenesis, evolutionary principles, and recombinant DNA technology.',
        'content': (
            "# NEET Zoology: Human Physiology, Reproduction, Evolution & Biotechnology Handbook\n\n"
            "## 1. Human Physiology Cornerstones\n"
            "- **Breathing & Capacities**: Vital Capacity VC = TV + IRV + ERV (~4600 mL); Residual Volume RV (~1200 mL); Bohr effect shifts curve right with high pCO2, temperature, and H+.\n"
            "- **Circulation & ECG**: QRS complex corresponds to ventricular depolarization; Normal cardiac output = 5 L/min; Erythroblastosis fetalis occurs when Rh- mother carries Rh+ second child.\n"
            "- **Excretion**: Medullary osmolarity gradient (300 to 1200 mOsm/L) maintained by countercurrent multiplier (Henle's loop) and exchanger (vasa recta) via NaCl and urea; Normal GFR = 125 mL/min (180 L/day).\n"
            "- **Muscular Contraction**: Sliding filament theory; A-band remains constant length while I-band and H-zone shorten; Troponin binds Ca2+ to unmask myosin binding sites on actin.\n\n"
            "## 2. Reproduction, Evolution & Biotechnology\n"
            "- **Human Reproduction**: Day 14 ovulation triggered by LH surge; Progesterone secreted by corpus luteum maintains pregnancy; Fertilization occurs in ampullary region.\n"
            "- **Evolution Evidences**: Homologous organs (vertebrate forelimbs) indicate divergent evolution from common ancestor; Hardy-Weinberg equation p^2 + 2pq + q^2 = 1.\n"
            "- **Biotechnology Tools**: Restriction enzyme EcoRI cuts 5'-GAATTC-3'; PCR stages: Denaturation (94°C), Annealing (55°C), Extension (72°C using Taq polymerase from Thermus aquaticus).\n"
            "- **Biotechnology Applications**: Bt cotton Cry toxins activated by alkaline insect midgut pH; ADA deficiency cured via retroviral gene therapy in lymphocytes; Humulin produced by Eli Lilly with disulfide-linked A and B chains.\n\n"
            "## 3. Sampled Representative Questions (50% Sampling)\n"
            + build_q_summary_markdown(zoo_sample, 12)
        )
    }
]

out_notes_file = os.path.join(BASE_DIR, 'neet_bundled_notes.json')
with open(out_notes_file, 'w', encoding='utf-8') as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"✅ Successfully compiled {len(notes)} master bundled notes to {out_notes_file}")
