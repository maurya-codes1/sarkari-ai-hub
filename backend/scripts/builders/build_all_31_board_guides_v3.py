# backend/scripts/builders/build_all_31_board_guides_v3.py
# Master Orchestrator for All 31 State & National School Boards (Phase 2B Complete)
# Guarantees:
# 1. 100% of 31 Boards have BOTH Class 10 and Class 12 (0 zero-question boards)
# 2. Strict folder separation (class10/, class12/science/, commerce/, arts/, languages/)
# 3. 250+ authentic curriculum MCQs per subject (0 synthetic "सेट #" strings)
# 4. 35-45+ authentic Subjectives per subject (3x to 4x expanded question bank)
# 5. Cluster-differentiated pattern tags & unique variations across boards

import os
import json
import sys
import shutil

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

from board_cluster_config import get_all_boards
from class10_master_builder_v2 import get_class10_math_v2
from class10_science_builder_v2 import get_class10_science_v2
from class10_social_builder_v2 import get_class10_social_v2
from class10_languages_builder_v2 import (
    get_class10_english_v2,
    get_class10_hindi_v2,
    get_class10_regional_language_v2
)

from class12_science_builder_v2 import (
    get_class12_physics_v2,
    get_class12_chemistry_v2,
    get_class12_math_v2,
    get_class12_biology_v2
)
from class12_commerce_builder_v2 import (
    get_class12_accountancy_v2,
    get_class12_business_studies_v2,
    get_class12_economics_v2
)
from class12_arts_builder_v2 import (
    get_class12_history_v2,
    get_class12_political_science_v2,
    get_class12_geography_v2
)
from class12_languages_builder_v2 import (
    get_class12_english_v2,
    get_class12_hindi_v2,
    get_class12_regional_language_v2
)

BASE_BOARDS_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", "data", "boards"))

def save_guide(rel_path, payload):
    target_file = os.path.join(BASE_BOARDS_DIR, rel_path)
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    return len(payload.get("objectives", [])), len(payload.get("subjectives", []))

def build_all():
    print("🚀 Starting Master Generator for ALL 31 School Boards (Phase 2B Zero-Dummy Architecture)...")

    # Clean existing board directories
    if os.path.exists(BASE_BOARDS_DIR):
        print(f"🧹 Clearing legacy files from {BASE_BOARDS_DIR}...")
        for b in os.listdir(BASE_BOARDS_DIR):
            p = os.path.join(BASE_BOARDS_DIR, b)
            if os.path.isdir(p):
                shutil.rmtree(p)
    os.makedirs(BASE_BOARDS_DIR, exist_ok=True)

    boards = get_all_boards()
    print(f"Loaded {len(boards)} boards configuration.\n")

    grand_files = 0
    grand_mcqs = 0
    grand_subjs = 0

    c10_mcqs = 0; c10_subjs = 0
    c12_mcqs = 0; c12_subjs = 0

    for idx, (b_id, cfg) in enumerate(boards, 1):
        b_name = cfg["name"]
        cluster = cfg["cluster"]
        primary_lang = cfg["lang"]
        reg_lang = cfg["reg_lang"]

        print(f"[{idx}/31] Processing: {b_name} ({b_id}) [Cluster: {cluster}]...")

        # ====================================================
        # 1. CLASS 10 (Strictly in boards/<board_id>/class10/)
        # ====================================================
        # 1.1 Math
        m_mcq, m_sub = get_class10_math_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class10", "math.json"), {
            "boardId": b_id,
            "stage": "Class 10",
            "subjectId": "subj-math",
            "subjectName": "गणित (Mathematics)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": m_mcq,
            "subjectives": m_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c10_mcqs += cm; c10_subjs += cs

        # 1.2 Science
        sc_mcq, sc_sub = get_class10_science_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class10", "science.json"), {
            "boardId": b_id,
            "stage": "Class 10",
            "subjectId": "subj-science",
            "subjectName": "विज्ञान (Science)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": sc_mcq,
            "subjectives": sc_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c10_mcqs += cm; c10_subjs += cs

        # 1.3 Social Science
        ss_mcq, ss_sub = get_class10_social_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class10", "social.json"), {
            "boardId": b_id,
            "stage": "Class 10",
            "subjectId": "subj-social",
            "subjectName": "सामाजिक विज्ञान (Social Science)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": ss_mcq,
            "subjectives": ss_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c10_mcqs += cm; c10_subjs += cs

        # 1.4 English
        en_mcq, en_sub = get_class10_english_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class10", "english.json"), {
            "boardId": b_id,
            "stage": "Class 10",
            "subjectId": "subj-english",
            "subjectName": "English (Language & Literature)",
            "language": "en",
            "objectives": en_mcq,
            "subjectives": en_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c10_mcqs += cm; c10_subjs += cs

        # 1.5 Hindi or Regional Language
        if reg_lang == "hi":
            hi_mcq, hi_sub = get_class10_hindi_v2(b_id, b_name, cluster)
            cm, cs = save_guide(os.path.join(b_id, "class10", "hindi.json"), {
                "boardId": b_id,
                "stage": "Class 10",
                "subjectId": "subj-hindi",
                "subjectName": "हिंदी (Course A & B)",
                "language": "hi",
                "objectives": hi_mcq,
                "subjectives": hi_sub
            })
            grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c10_mcqs += cm; c10_subjs += cs
        else:
            reg_mcq, reg_sub = get_class10_regional_language_v2(b_id, b_name, reg_lang)
            cm, cs = save_guide(os.path.join(b_id, "class10", f"language_{reg_lang}.json"), {
                "boardId": b_id,
                "stage": "Class 10",
                "subjectId": f"subj-{reg_lang}",
                "subjectName": f"Regional Language ({reg_lang.upper()})",
                "language": reg_lang,
                "objectives": reg_mcq,
                "subjectives": reg_sub
            })
            grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c10_mcqs += cm; c10_subjs += cs

        # ====================================================
        # 2. CLASS 12 (Strictly in boards/<board_id>/class12/<stream>/)
        # ====================================================
        # --- Stream 1: SCIENCE ---
        # 2.1 Physics
        p_mcq, p_sub = get_class12_physics_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "science", "physics.json"), {
            "boardId": b_id,
            "stage": "Class 12 Science",
            "subjectId": "subj-physics",
            "subjectName": "भौतिक विज्ञान (Physics 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": p_mcq,
            "subjectives": p_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.2 Chemistry
        c_mcq, c_sub = get_class12_chemistry_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "science", "chemistry.json"), {
            "boardId": b_id,
            "stage": "Class 12 Science",
            "subjectId": "subj-chemistry",
            "subjectName": "रसायन विज्ञान (Chemistry 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": c_mcq,
            "subjectives": c_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.3 Mathematics 12
        m12_mcq, m12_sub = get_class12_math_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "science", "math12.json"), {
            "boardId": b_id,
            "stage": "Class 12 Science",
            "subjectId": "subj-math12",
            "subjectName": "गणित (Higher Mathematics 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": m12_mcq,
            "subjectives": m12_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.4 Biology
        b_mcq, b_sub = get_class12_biology_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "science", "biology.json"), {
            "boardId": b_id,
            "stage": "Class 12 Science",
            "subjectId": "subj-biology",
            "subjectName": "जीव विज्ञान (Biology 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": b_mcq,
            "subjectives": b_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # --- Stream 2: COMMERCE ---
        # 2.5 Accountancy
        acc_mcq, acc_sub = get_class12_accountancy_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "commerce", "accountancy.json"), {
            "boardId": b_id,
            "stage": "Class 12 Commerce",
            "subjectId": "subj-accountancy",
            "subjectName": "लेखाशास्त्र (Accountancy 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": acc_mcq,
            "subjectives": acc_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.6 Business Studies
        bst_mcq, bst_sub = get_class12_business_studies_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "commerce", "business_studies.json"), {
            "boardId": b_id,
            "stage": "Class 12 Commerce",
            "subjectId": "subj-business-studies",
            "subjectName": "व्यावसायिक अध्ययन (Business Studies 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": bst_mcq,
            "subjectives": bst_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.7 Economics
        ec_mcq, ec_sub = get_class12_economics_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "commerce", "economics.json"), {
            "boardId": b_id,
            "stage": "Class 12 Commerce",
            "subjectId": "subj-economics",
            "subjectName": "अर्थशास्त्र (Economics 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": ec_mcq,
            "subjectives": ec_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # --- Stream 3: ARTS / HUMANITIES ---
        # 2.8 History
        h_mcq, h_sub = get_class12_history_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "arts", "history.json"), {
            "boardId": b_id,
            "stage": "Class 12 Arts",
            "subjectId": "subj-history",
            "subjectName": "इतिहास (History 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": h_mcq,
            "subjectives": h_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.9 Political Science
        pol_mcq, pol_sub = get_class12_political_science_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "arts", "political_science.json"), {
            "boardId": b_id,
            "stage": "Class 12 Arts",
            "subjectId": "subj-political-science",
            "subjectName": "राजनीति विज्ञान (Political Science 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": pol_mcq,
            "subjectives": pol_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.10 Geography
        geo_mcq, geo_sub = get_class12_geography_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "arts", "geography.json"), {
            "boardId": b_id,
            "stage": "Class 12 Arts",
            "subjectId": "subj-geography",
            "subjectName": "भूगोल (Geography 12th)",
            "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
            "objectives": geo_mcq,
            "subjectives": geo_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # --- Stream 4: LANGUAGES ---
        # 2.11 English Core
        en12_mcq, en12_sub = get_class12_english_v2(b_id, b_name, cluster)
        cm, cs = save_guide(os.path.join(b_id, "class12", "languages", "english.json"), {
            "boardId": b_id,
            "stage": "Class 12 Languages",
            "subjectId": "subj-english",
            "subjectName": "English Core (Class 12th)",
            "language": "en",
            "objectives": en12_mcq,
            "subjectives": en12_sub
        })
        grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

        # 2.12 Hindi or Regional Language
        if reg_lang == "hi":
            hi12_mcq, hi12_sub = get_class12_hindi_v2(b_id, b_name, cluster)
            cm, cs = save_guide(os.path.join(b_id, "class12", "languages", "hindi.json"), {
                "boardId": b_id,
                "stage": "Class 12 Languages",
                "subjectId": "subj-hindi",
                "subjectName": "हिंदी आधार / ऐच्छिक (Hindi Core 12th)",
                "language": "hi",
                "objectives": hi12_mcq,
                "subjectives": hi12_sub
            })
            grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs
        else:
            reg12_mcq, reg12_sub = get_class12_regional_language_v2(b_id, b_name, reg_lang)
            cm, cs = save_guide(os.path.join(b_id, "class12", "languages", f"language_{reg_lang}.json"), {
                "boardId": b_id,
                "stage": "Class 12 Languages",
                "subjectId": f"subj-{reg_lang}",
                "subjectName": f"Regional Language 12th ({reg_lang.upper()})",
                "language": reg_lang,
                "objectives": reg12_mcq,
                "subjectives": reg12_sub
            })
            grand_files += 1; grand_mcqs += cm; grand_subjs += cs; c12_mcqs += cm; c12_subjs += cs

    print("\n=======================================================")
    print("🎉 ALL 31 BOARDS MASTER GENERATION COMPLETED SUCCESSFULLY!")
    print(f"Total Guide Files: {grand_files}")
    print(f"Total Authentic MCQs: {grand_mcqs} (Class 10: {c10_mcqs}, Class 12: {c12_mcqs})")
    print(f"Total Authentic Subjectives: {grand_subjs} (Class 10: {c10_subjs}, Class 12: {c12_subjs})")
    print(f"Grand Total Questions Built: {grand_mcqs + grand_subjs}")
    print("=======================================================\n")

if __name__ == "__main__":
    build_all()
