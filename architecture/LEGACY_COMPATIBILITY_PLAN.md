# SARKARIAI HUB — LEGACY COMPATIBILITY & ADAPTER STRATEGY (PHASE 2)

## 1. Context & Purpose
The current SarkariAI Hub application relies heavily on two static client-side structures:
1. `EXAMS_DATABASE` (in `public/js/exams-data.js`): Consumed by the home feed, search engine, directory, and dynamic detail pages (`#exam/:id`).
2. `EXAMS_CONFIG`, `MASTER_QUESTIONS`, `CLIENT_BLUEPRINTS`, and `getFilteredQuestions()` (in `public/js/quiz-data.js`): Consumed by the interactive CBT test simulator (`public/js/quiz.js`).

To ensure that future database implementations (Phase 3+) **NEVER break the working UI**, we have designed a **Bidirectional Compatibility Adapter Pattern**.

---

## 2. Legacy Adapter Architecture

```mermaid
flowchart LR
    subgraph New Core Data Layer
        DB[(Persistent Blueprint DB)]
        REG[Universal Exam Registry]
    end

    subgraph Legacy Compatibility Adapter
        ADAPT_EXAM[Exams Database Adapter]
        ADAPT_QUIZ[Quiz Engine Adapter]
    end

    subgraph Existing Frontend UI - Untouched
        UI_HOME[Home & Search]
        UI_DETAIL[#exam/:id Detail Page]
        UI_QUIZ[CBT Mock Test Simulator]
        UI_TOOLS[Tools & Resizer]
    end

    DB --> REG
    REG --> ADAPT_EXAM
    REG --> ADAPT_QUIZ
    ADAPT_EXAM -->|Generates legacy window.EXAMS_DATABASE| UI_HOME
    ADAPT_EXAM -->|Provides legacy fields| UI_DETAIL
    ADAPT_QUIZ -->|Provides legacy getFilteredQuestions()| UI_QUIZ
    ADAPT_QUIZ -->|Populates window.EXAMS_CONFIG| UI_QUIZ
```

---

## 3. Detailed Entity-to-Legacy Mapping

### A. Mapping New Exam & Blueprint to Legacy `EXAMS_DATABASE` Item

```javascript
/**
 * Legacy Adapter: Converts normalized Exam, Version & Blueprint entities
 * to the exact legacy schema expected by public/js/app.js & router.js
 */
function adaptExamToLegacyFormat(examEntity, currentVersion, blueprint, org, board) {
  return {
    id: examEntity.exam_id,
    name: examEntity.name,
    shortName: examEntity.short_name,
    category: mapCategoryToLegacy(examEntity.category),
    conductingBody: org.name,
    state: org.state_or_ut || "All India / Central",
    status: examEntity.status,
    officialUrl: examEntity.official_website,
    applyUrl: examEntity.notification_url || examEntity.official_website,
    pdfUrl: examEntity.syllabus_url || examEntity.official_website,
    resultUrl: examEntity.result_url || examEntity.official_website,
    resultServer2: examEntity.result_url,
    digilockerUrl: "https://digilocker.gov.in",
    
    // Derived from Blueprint & Versioning:
    importantDates: {
      "Academic / Recruitment Year": currentVersion.academic_year || currentVersion.recruitment_year,
      "Official Notification": currentVersion.effective_from || "Announced",
      "Examination Date": blueprint ? `${blueprint.duration_minutes} Mins CBT/Exam` : "Check Portal"
    },
    fees: {
      "Regular Application Fee": "Refer Official Notification"
    },
    eligibility: examEntity.level ? `${examEntity.level} Level Examination` : "See details",
    ageLimit: "As per official notification",
    vacancies: {
      "Status": "Verified Official Notice"
    },
    examPattern: {
      "Mode": blueprint ? blueprint.answer_format : "Offline/Online",
      "Duration": blueprint ? `${blueprint.duration_minutes} Minutes` : "Official Duration",
      "Total Marks": blueprint ? `${blueprint.total_marks} Marks` : "100 Marks",
      "Total Questions": blueprint ? `${blueprint.total_questions} Questions` : "Official Pattern",
      "Negative Marking": blueprint && blueprint.is_negative_marking ? "Applicable" : "No Negative Marking"
    },
    photoSpecs: {
      type: "photo",
      minKb: 20,
      maxKb: 50,
      targetKb: 35,
      width: 350,
      height: 450,
      aspectRatio: "3.5:4.5"
    },
    signSpecs: {
      type: "signature",
      minKb: 10,
      maxKb: 20,
      targetKb: 15,
      width: 300,
      height: 120
    }
  };
}
```

### B. Mapping Blueprint & Normalized Questions to Legacy `getFilteredQuestions()`

```javascript
/**
 * Legacy Adapter: Exposes the exact signature expected by public/js/quiz.js
 * getFilteredQuestions(examId, subjectId, requestedCount, boardId)
 */
function adaptFilteredQuestions(blueprint, questions, requestedCount, languageMode = 'bilingual-hindi') {
  // If user requested a custom size (e.g. 30 in practice set), honor requestedCount
  // If user requested full test, honor blueprint.questions_to_attempt
  const targetCount = requestedCount || blueprint.questions_to_attempt;
  
  return questions.slice(0, targetCount).map((q, idx) => {
    const langObj = q.language_content[languageMode] || q.language_content['hi'] || q.language_content['en'];
    return {
      id: `${q.question_id}-${idx + 1}`,
      uniqueKey: `${q.question_id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      examTags: [blueprint.exam_id],
      subjectTags: [q.subject_id],
      subjectName: q.subject_name || "General",
      q: langObj.q,
      options: langObj.options,
      correct: q.correct_answer.index !== undefined ? q.correct_answer.index : 0,
      ans: langObj.ans || langObj.options[q.correct_answer.index || 0],
      explanation: langObj.exp || "Verified official answer.",
      topic: q.topic_name || "General Section",
      boardTag: q.board_name || "Official Examination"
    };
  });
}
```

---

## 4. Phased Safety Guarantees
1. In Phase 2, **no code is touched**. Legacy files remain active.
2. In Phase 3, when the database is introduced, the adapter will be written and tested side-by-side with unit tests.
3. The legacy arrays (`window.EXAMS_DATABASE`) will be populated automatically by the adapter at startup.
4. The existing UI and tools will read from the adapter without knowing whether the backend is an in-memory file or a PostgreSQL database.
