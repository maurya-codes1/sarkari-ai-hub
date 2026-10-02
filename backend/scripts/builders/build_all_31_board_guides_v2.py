# backend/scripts/builders/build_all_31_board_guides_v2.py
# Master Generator for All 31 State & National School Boards (Phase 2B)
# Implements:
# 1. Strict Class 10 and Class 12 folder separation (Zero mixing)
# 2. Strict Class 12 Stream separation: Science, Commerce, Arts
# 3. 220+ Authentic MCQs per subject with detailed solutions and 4 options
# 4. 10-20+ Authentic Subjectives per subject with complete marking schemes

import os
import json
import sys
import shutil

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

from class10_master_builder import (
    get_class10_math,
    get_class10_science,
    get_class10_social,
    get_class10_english,
    get_class10_hindi
)
from board_domain_regional import get_regional_language_mcqs

from class12_science_builder import (
    get_class12_physics,
    get_class12_chemistry,
    get_class12_math,
    get_class12_biology
)
from class12_commerce_builder import (
    get_class12_accountancy,
    get_class12_business_studies,
    get_class12_economics
)
from class12_arts_builder import (
    get_class12_history,
    get_class12_political_science,
    get_class12_geography
)
from class12_languages_builder import (
    get_class12_english,
    get_class12_hindi
)

BASE_BOARDS_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", "data", "boards"))

ALL_31_BOARDS = [
    # 1. National Boards (3)
    {"id": "cbse-board", "name": "CBSE Board (Central Board of Secondary Education)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "icse-cisce", "name": "ICSE & ISC Board (CISCE New Delhi)", "lang": "en", "reg_lang": "en", "has_10th": True, "has_12th": True},
    {"id": "nios-board", "name": "NIOS Board (National Institute of Open Schooling)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},

    # 2. Hindi Belt State Boards (9)
    {"id": "upmsp-board", "name": "UP Board (UPMSP Prayagraj High School & Inter)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "bseb-bihar", "name": "Bihar Board BSEB (Matric 10th & Inter 12th Patna)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "rbse-rajasthan", "name": "Rajasthan Board (RBSE 10th & 12th Ajmer)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "mpbse-board", "name": "MP Board (MPBSE 10th & 12th Bhopal)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "bseh-haryana", "name": "Haryana Board (BSEH Bhiwani 10th & 12th)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "jac-jharkhand", "name": "Jharkhand Board (JAC Ranchi Matric 10th & Inter 12th)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "cgbse-chhattisgarh", "name": "Chhattisgarh Board (CGBSE Raipur 10th & 12th)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "ubse-uttarakhand", "name": "Uttarakhand Board (UBSE Ramnagar 10th & 12th)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},
    {"id": "hpbose-board", "name": "Himachal Pradesh Board (HPBOSE Dharamshala 10th & 12th)", "lang": "hi", "reg_lang": "hi", "has_10th": True, "has_12th": True},

    # 3. Western & Central States (3)
    {"id": "maharashtra-board", "name": "Maharashtra State Board (MSBSHSE SSC 10th & HSC 12th)", "lang": "mr", "reg_lang": "mr", "has_10th": True, "has_12th": True},
    {"id": "gseb-gujarat", "name": "Gujarat Board (GSEB Gandhinagar SSC 10th & HSC 12th)", "lang": "gu", "reg_lang": "gu", "has_10th": True, "has_12th": True},
    {"id": "gbshse-board", "name": "Goa Board of Secondary & Higher Secondary (GBSHSE)", "lang": "mr", "reg_lang": "mr", "has_10th": True, "has_12th": True},

    # 4. Eastern & North-Eastern States (8)
    {"id": "wbbse-wb", "name": "West Bengal Board (WBBSE Madhyamik 10th & WBCHSE 12th)", "lang": "bn", "reg_lang": "bn", "has_10th": True, "has_12th": True},
    {"id": "chse-bse-odisha", "name": "Odisha Board (BSE Matric 10th & CHSE +2 Council)", "lang": "or", "reg_lang": "or", "has_10th": True, "has_12th": True},
    {"id": "seba-ahsec-assam", "name": "Assam Board (SEBA HSLC 10th & AHSEC HS 12th)", "lang": "as", "reg_lang": "as", "has_10th": True, "has_12th": True},
    {"id": "tbse-board", "name": "Tripura Board of Secondary Education (TBSE)", "lang": "bn", "reg_lang": "bn", "has_10th": True, "has_12th": True},
    {"id": "mbose-board", "name": "Meghalaya Board of School Education (MBOSE)", "lang": "en", "reg_lang": "en", "has_10th": True, "has_12th": True},
    {"id": "mbse-board", "name": "Mizoram Board of School Education (MBSE)", "lang": "en", "reg_lang": "en", "has_10th": True, "has_12th": True},
    {"id": "nbse-board", "name": "Nagaland Board of School Education (NBSE)", "lang": "en", "reg_lang": "en", "has_10th": True, "has_12th": True},
    {"id": "bsem-board", "name": "Board of Secondary Education Manipur (BSEM & COHSEM)", "lang": "en", "reg_lang": "en", "has_10th": True, "has_12th": True},

    # 5. Southern States (6)
    {"id": "kseab-karnataka", "name": "Karnataka Board (KSEAB SSLC 10th & 2nd PUC)", "lang": "kn", "reg_lang": "kn", "has_10th": True, "has_12th": True},
    {"id": "tndge-tamilnadu", "name": "Tamil Nadu State Board (TNDGE SSLC 10th & HSE +2)", "lang": "ta", "reg_lang": "ta", "has_10th": True, "has_12th": True},
    {"id": "kerala-board", "name": "Kerala Directorate of General Education (SSLC & DHSE)", "lang": "ml", "reg_lang": "ml", "has_10th": True, "has_12th": True},
    {"id": "bseap-board", "name": "Board of Secondary Education Andhra Pradesh (BSEAP SSC 10th)", "lang": "te", "reg_lang": "te", "has_10th": True, "has_12th": False},
    {"id": "bsetg-board", "name": "Directorate of Government Examinations Telangana (BSETG SSC 10th)", "lang": "te", "reg_lang": "te", "has_10th": True, "has_12th": False},
    {"id": "tsbie-bieap", "name": "Telangana & AP Intermediate Board (TSBIE & BIEAP Inter 1st/2nd Yr)", "lang": "te", "reg_lang": "te", "has_10th": False, "has_12th": True},

    # 6. Northern / Border States (2)
    {"id": "pseb-punjab", "name": "Punjab School Education Board (PSEB Mohali 10th & 12th)", "lang": "pa", "reg_lang": "pa", "has_10th": True, "has_12th": True},
    {"id": "jkbose-board", "name": "Jammu & Kashmir Board (JKBOSE 10th & 12th)", "lang": "ur", "reg_lang": "ur", "has_10th": True, "has_12th": True},
]

def save_guide(rel_path, payload):
    target_file = os.path.join(BASE_BOARDS_DIR, rel_path)
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    return len(payload.get("objectives", [])), len(payload.get("subjectives", []))

def build_all():
    print("🚀 Starting Master Generation for ALL 31 School Boards (Phase 2B Clean Isolated Architecture)...")

    # Clean existing board directories to avoid any orphan / mixed files
    if os.path.exists(BASE_BOARDS_DIR):
        print(f"🧹 Clearing legacy files from {BASE_BOARDS_DIR}...")
        for b in os.listdir(BASE_BOARDS_DIR):
            p = os.path.join(BASE_BOARDS_DIR, b)
            if os.path.isdir(p):
                shutil.rmtree(p)
    os.makedirs(BASE_BOARDS_DIR, exist_ok=True)

    total_files = 0
    total_mcqs = 0
    total_subjs = 0

    class10_files = 0
    class10_mcqs = 0
    class10_subjs = 0

    class12_files = 0
    class12_mcqs = 0
    class12_subjs = 0

    for idx, board in enumerate(ALL_31_BOARDS, 1):
        b_id = board["id"]
        b_name = board["name"]
        primary_lang = board["lang"]
        reg_lang = board["reg_lang"]
        has_10th = board.get("has_10th", True)
        has_12th = board.get("has_12th", True)

        print(f"\n[{idx}/31] Generating Question Banks for {b_name} ({b_id})...")

        # ==========================================
        # 1. CLASS 10 (Strictly Isolated Directory: boards/<board_id>/class10/)
        # ==========================================
        if has_10th:
            # 1.1 Mathematics
            m_mcqs, m_sub = get_class10_math(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class10", "math.json"), {
                "boardId": b_id,
                "stage": "Class 10",
                "subjectId": "subj-math",
                "subjectName": "गणित (Mathematics)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": m_mcqs,
                "subjectives": m_sub
            })
            class10_files += 1; class10_mcqs += cnt_m; class10_subjs += cnt_s

            # 1.2 Science
            sc_mcqs, sc_sub = get_class10_science(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class10", "science.json"), {
                "boardId": b_id,
                "stage": "Class 10",
                "subjectId": "subj-science",
                "subjectName": "विज्ञान (Science)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": sc_mcqs,
                "subjectives": sc_sub
            })
            class10_files += 1; class10_mcqs += cnt_m; class10_subjs += cnt_s

            # 1.3 Social Science
            soc_mcqs, soc_sub = get_class10_social(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class10", "social.json"), {
                "boardId": b_id,
                "stage": "Class 10",
                "subjectId": "subj-social",
                "subjectName": "सामाजिक विज्ञान (Social Science)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": soc_mcqs,
                "subjectives": soc_sub
            })
            class10_files += 1; class10_mcqs += cnt_m; class10_subjs += cnt_s

            # 1.4 English Language & Literature
            eng_mcqs, eng_sub = get_class10_english(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class10", "english.json"), {
                "boardId": b_id,
                "stage": "Class 10",
                "subjectId": "subj-english",
                "subjectName": "English Language & Literature",
                "language": "en",
                "objectives": eng_mcqs,
                "subjectives": eng_sub
            })
            class10_files += 1; class10_mcqs += cnt_m; class10_subjs += cnt_s

            # 1.5 Hindi Language
            hin_mcqs, hin_sub = get_class10_hindi(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class10", "hindi.json"), {
                "boardId": b_id,
                "stage": "Class 10",
                "subjectId": "subj-hindi",
                "subjectName": "सामान्य हिन्दी (General Hindi)",
                "language": "hi",
                "objectives": hin_mcqs,
                "subjectives": hin_sub
            })
            class10_files += 1; class10_mcqs += cnt_m; class10_subjs += cnt_s

            # 1.6 Regional Language (if non-Hindi board)
            if reg_lang != "hi":
                reg_mcqs, reg_sub = get_regional_language_mcqs(reg_lang, b_name, 215)
                lang_subj_map = {
                    "mr": "subj-marathi", "gu": "subj-gujarati", "bn": "subj-bengali",
                    "or": "subj-odia", "as": "subj-assamese", "pa": "subj-punjabi",
                    "ta": "subj-tamil", "te": "subj-telugu", "kn": "subj-kannada",
                    "ml": "subj-malayalam", "ur": "subj-urdu", "en": "subj-english"
                }
                reg_sub_id = lang_subj_map.get(reg_lang, "subj-hindi")
                cnt_m, cnt_s = save_guide(os.path.join(b_id, "class10", f"language_{reg_lang}.json"), {
                    "boardId": b_id,
                    "stage": "Class 10",
                    "subjectId": reg_sub_id,
                    "subjectName": f"Regional Language ({reg_sub_id.replace('subj-', '').upper()})",
                    "language": reg_lang,
                    "objectives": reg_mcqs,
                    "subjectives": reg_sub
                })
                class10_files += 1; class10_mcqs += cnt_m; class10_subjs += cnt_s

        # ==========================================
        # 2. CLASS 12 (Strictly Divided into 3 Streams)
        # ==========================================
        if has_12th:
            # ------------------------------------------
            # 2.1 STREAM 1: SCIENCE (class12/science/)
            # ------------------------------------------
            # Physics
            phy_mcqs, phy_sub = get_class12_physics(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "science", "physics.json"), {
                "boardId": b_id,
                "stage": "Class 12 Science",
                "subjectId": "subj-physics",
                "subjectName": "भौतिक विज्ञान (Physics)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": phy_mcqs,
                "subjectives": phy_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Chemistry
            chem_mcqs, chem_sub = get_class12_chemistry(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "science", "chemistry.json"), {
                "boardId": b_id,
                "stage": "Class 12 Science",
                "subjectId": "subj-chemistry",
                "subjectName": "रसायन विज्ञान (Chemistry)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": chem_mcqs,
                "subjectives": chem_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Higher Mathematics
            m12_mcqs, m12_sub = get_class12_math(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "science", "math12.json"), {
                "boardId": b_id,
                "stage": "Class 12 Science",
                "subjectId": "subj-math12",
                "subjectName": "उच्चतर गणित (Higher Mathematics)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": m12_mcqs,
                "subjectives": m12_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Biology
            bio_mcqs, bio_sub = get_class12_biology(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "science", "biology.json"), {
                "boardId": b_id,
                "stage": "Class 12 Science",
                "subjectId": "subj-biology",
                "subjectName": "जीव विज्ञान (Biology)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": bio_mcqs,
                "subjectives": bio_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # English Core (Science)
            e12_mcqs, e12_sub = get_class12_english(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "science", "english.json"), {
                "boardId": b_id,
                "stage": "Class 12 Science",
                "subjectId": "subj-english",
                "subjectName": "English Core (Science Stream)",
                "language": "en",
                "objectives": e12_mcqs,
                "subjectives": e12_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # ------------------------------------------
            # 2.2 STREAM 2: COMMERCE (class12/commerce/)
            # ------------------------------------------
            # Accountancy
            acc_mcqs, acc_sub = get_class12_accountancy(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "commerce", "accountancy.json"), {
                "boardId": b_id,
                "stage": "Class 12 Commerce",
                "subjectId": "subj-accountancy",
                "subjectName": "लेखाशास्त्र (Accountancy)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": acc_mcqs,
                "subjectives": acc_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Business Studies
            bst_mcqs, bst_sub = get_class12_business_studies(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "commerce", "business.json"), {
                "boardId": b_id,
                "stage": "Class 12 Commerce",
                "subjectId": "subj-business",
                "subjectName": "व्यावसायिक अध्ययन (Business Studies)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": bst_mcqs,
                "subjectives": bst_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Economics
            eco_mcqs, eco_sub = get_class12_economics(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "commerce", "economics.json"), {
                "boardId": b_id,
                "stage": "Class 12 Commerce",
                "subjectId": "subj-economics",
                "subjectName": "अर्थशास्त्र (Economics)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": eco_mcqs,
                "subjectives": eco_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # English Core (Commerce)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "commerce", "english.json"), {
                "boardId": b_id,
                "stage": "Class 12 Commerce",
                "subjectId": "subj-english",
                "subjectName": "English Core (Commerce Stream)",
                "language": "en",
                "objectives": e12_mcqs,
                "subjectives": e12_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # ------------------------------------------
            # 2.3 STREAM 3: ARTS / HUMANITIES (class12/arts/)
            # ------------------------------------------
            # History
            his_mcqs, his_sub = get_class12_history(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "arts", "history.json"), {
                "boardId": b_id,
                "stage": "Class 12 Arts",
                "subjectId": "subj-history",
                "subjectName": "इतिहास (History)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": his_mcqs,
                "subjectives": his_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Political Science
            pol_mcqs, pol_sub = get_class12_political_science(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "arts", "polity.json"), {
                "boardId": b_id,
                "stage": "Class 12 Arts",
                "subjectId": "subj-polity",
                "subjectName": "राजनीति विज्ञान (Political Science)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": pol_mcqs,
                "subjectives": pol_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Geography
            geo_mcqs, geo_sub = get_class12_geography(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "arts", "geography.json"), {
                "boardId": b_id,
                "stage": "Class 12 Arts",
                "subjectId": "subj-geography",
                "subjectName": "भूगोल (Geography)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": geo_mcqs,
                "subjectives": geo_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Economics (Arts)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "arts", "economics.json"), {
                "boardId": b_id,
                "stage": "Class 12 Arts",
                "subjectId": "subj-economics",
                "subjectName": "अर्थशास्त्र (Economics - Arts)",
                "language": "hi" if primary_lang in ["hi", "mr", "gu", "pa"] else "en",
                "objectives": eco_mcqs,
                "subjectives": eco_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

            # Hindi / Regional Literature (Arts)
            h12_mcqs, h12_sub = get_class12_hindi(b_name)
            cnt_m, cnt_s = save_guide(os.path.join(b_id, "class12", "arts", "hindi.json"), {
                "boardId": b_id,
                "stage": "Class 12 Arts",
                "subjectId": "subj-hindi",
                "subjectName": "सामान्य व साहित्यिक हिन्दी (Hindi Literature)",
                "language": "hi",
                "objectives": h12_mcqs,
                "subjectives": h12_sub
            })
            class12_files += 1; class12_mcqs += cnt_m; class12_subjs += cnt_s

    total_files = class10_files + class12_files
    total_mcqs = class10_mcqs + class12_mcqs
    total_subjs = class10_subjs + class12_subjs

    print("\n" + "="*70)
    print("🎉 PHASE 2B MASTER GENERATION COMPLETE ACROSS ALL 31 BOARDS!")
    print(f"📁 Total Guide Files Written: {total_files}")
    print(f"   ├─ Class 10 Guides:        {class10_files} files ({class10_mcqs:,} MCQs, {class10_subjs:,} Subjs)")
    print(f"   └─ Class 12 Stream Guides: {class12_files} files ({class12_mcqs:,} MCQs, {class12_subjs:,} Subjs)")
    print(f"📊 Grand Total MCQs Generated:        {total_mcqs:,}")
    print(f"✍️ Grand Total Subjectives Generated:  {total_subjs:,}")
    print(f"🎯 Total High-Yield Questions:        {(total_mcqs + total_subjs):,}")
    print("="*70)

if __name__ == "__main__":
    build_all()
