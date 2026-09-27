// backend/services/registration-eligibility-service.js
// Registration & Eligibility Service for Phase 10.1:
// - Source-driven registration schedules, fees, correction windows, portal URLs
// - Exam & Board specific eligibility criteria (age, qualification, attempts, physical standards)
// - Candidate eligibility evaluation with category-wise relaxations

const { getDb } = require('../db/database');

class RegistrationEligibilityService {
  /**
   * Retrieves registration details for an exam or board class
   */
  getRegistrationSchedule(entityId, academicYear = '2024-25', db = getDb()) {
    if (!db || !entityId) return null;

    const row = db.prepare(`
      SELECT * FROM exam_registrations
      WHERE entity_id = ?
      ORDER BY academic_year DESC
      LIMIT 1
    `).get(entityId);

    if (!row) return null;

    const now = new Date().toISOString().split('T')[0];
    const isRegistrationOpen = now >= row.registration_start_date && now <= row.registration_end_date;
    const isCorrectionOpen = row.correction_window_start && row.correction_window_end &&
                             now >= row.correction_window_start && now <= row.correction_window_end;

    const feeStructure = {
      GEN: row.general_fee_inr,
      UR: row.general_fee_inr,
      OBC: row.general_fee_inr,
      EWS: row.general_fee_inr,
      SC: row.reserved_fee_inr,
      ST: row.reserved_fee_inr,
      FEMALE: row.reserved_fee_inr,
      PWD: row.reserved_fee_inr
    };

    return {
      registrationId: row.registration_id,
      entityType: row.entity_type,
      entityId: row.entity_id,
      academicYear: row.academic_year,
      sessionName: row.session_name,
      timeline: {
        notificationDate: row.notification_date,
        registrationStartDate: row.registration_start_date,
        registrationEndDate: row.registration_end_date,
        correctionWindowStart: row.correction_window_start,
        correctionWindowEnd: row.correction_window_end,
        admitCardDate: row.admit_card_date,
        examStartDate: row.exam_start_date,
        examEndDate: row.exam_end_date,
        resultDate: row.result_date
      },
      currentStatus: {
        isRegistrationOpen,
        isCorrectionOpen,
        daysRemaining: Math.max(0, Math.ceil((new Date(row.registration_end_date) - new Date(now)) / (1000 * 60 * 60 * 24)))
      },
      fees: {
        generalInr: row.general_fee_inr,
        reservedInr: row.reserved_fee_inr
      },
      fee_structure: feeStructure,
      portals: {
        officialPortalUrl: row.official_portal_url,
        officialNotificationUrl: row.official_notification_url
      },
      portal_url: row.official_portal_url,
      verificationStatus: row.verification_status
    };
  }

  /**
   * Retrieves eligibility criteria for an exam or board class
   */
  getEligibilityCriteria(entityId, db = getDb()) {
    if (!db || !entityId) return null;

    const row = db.prepare(`
      SELECT * FROM exam_eligibility_criteria
      WHERE entity_id = ?
    `).get(entityId);

    if (!row) return null;

    return {
      eligibilityId: row.eligibility_id,
      entityType: row.entity_type,
      entityId: row.entity_id,
      ageCriteria: {
        minAge: row.min_age,
        maxAge: row.max_age,
        ageRelaxations: JSON.parse(row.age_relaxation_json || '{}')
      },
      educationQualification: {
        en: row.educational_qualification_en,
        hi: row.educational_qualification_hi,
        subjectRequirements: JSON.parse(row.subject_requirements_json || '[]'),
        streamRequirements: JSON.parse(row.stream_requirements_json || '[]')
      },
      attemptRules: {
        maxAttempts: row.attempt_limit === -1 ? 'UNLIMITED' : row.attempt_limit
      },
      citizenshipAndDomicile: {
        nationality: row.nationality,
        domicileRequirement: row.domicile_requirement_en
      },
      physicalStandards: JSON.parse(row.physical_standards_json || 'null'),
      verificationStatus: row.verification_status
    };
  }

  /**
   * Evaluates a candidate profile against eligibility criteria
   */
  evaluateCandidateEligibility(entityId, candidateProfile = {}, db = getDb()) {
    const criteria = this.getEligibilityCriteria(entityId, db);
    if (!criteria) {
      return {
        isEligible: false,
        status: 'CRITERIA_PENDING_VERIFICATION',
        errors: ['Official eligibility criteria is being verified.'],
        disqualifications: ['Official eligibility criteria is being verified.']
      };
    }

    const errors = [];
    const relaxationsApplied = [];

    // 1. Category normalization (GEN / UR synonym)
    const rawCategory = (candidateProfile.category || 'UR').toUpperCase();
    const category = rawCategory === 'GEN' ? 'UR' : rawCategory;

    // 2. Age Calculation & Validation
    const candidateAge = Number(candidateProfile.age);

    if (!isNaN(candidateAge) && criteria.ageCriteria.minAge !== null) {
      if (candidateAge < criteria.ageCriteria.minAge) {
        errors.push(`Candidate age (${candidateAge}) is below the minimum age of ${criteria.ageCriteria.minAge} years.`);
      }

      let maxAllowedAge = criteria.ageCriteria.maxAge;
      if (maxAllowedAge !== null) {
        const storedRelaxations = criteria.ageCriteria.ageRelaxations || {};
        const relaxation = (storedRelaxations[category] !== undefined)
          ? Number(storedRelaxations[category])
          : ((storedRelaxations[rawCategory] !== undefined) ? Number(storedRelaxations[rawCategory]) : 0);

        if (relaxation > 0) {
          maxAllowedAge += relaxation;
          relaxationsApplied.push(`${rawCategory} relaxation of ${relaxation} years (max permissible age: ${maxAllowedAge}).`);
        }

        if (candidateAge > maxAllowedAge) {
          errors.push(`Maximum age limit exceeded: Candidate age (${candidateAge}) exceeds the maximum permissible age of ${maxAllowedAge} years for ${rawCategory}.`);
        }
      }
    }

    // 3. Attempt Limits Check
    const maxAttempts = criteria.attemptRules.maxAttempts;
    const attemptsMade = Number(candidateProfile.attemptsMade ?? candidateProfile.attemptsUsed) || 0;

    if (maxAttempts !== 'UNLIMITED') {
      if (attemptsMade >= maxAttempts) {
        errors.push(`Maximum attempts limit (${maxAttempts}) reached for ${rawCategory} category.`);
      }
    }

    const remainingAttempts = maxAttempts === 'UNLIMITED'
      ? 'UNLIMITED'
      : Math.max(0, maxAttempts - attemptsMade);

    // 4. Physical Standards Check (if post has physical standards)
    if (criteria.physicalStandards && candidateProfile.physicalAttributes) {
      const { gender = 'male', heightCm, chestCm } = candidateProfile.physicalAttributes;
      const minHeight = gender === 'female'
        ? criteria.physicalStandards.femaleHeightCm
        : criteria.physicalStandards.maleHeightCm;

      if (minHeight && heightCm && heightCm < minHeight) {
        errors.push(`Height (${heightCm} cm) does not meet minimum requirement of ${minHeight} cm for ${gender} candidates.`);
      }
    }

    return {
      isEligible: errors.length === 0,
      entityId,
      category: rawCategory,
      relaxationsApplied,
      errors,
      disqualifications: errors,
      remainingAttempts,
      criteriaSummary: {
        minAge: criteria.ageCriteria.minAge,
        maxAge: criteria.ageCriteria.maxAge,
        qualification: criteria.educationQualification.en,
        maxAttempts: criteria.attemptRules.maxAttempts
      }
    };
  }
}

module.exports = new RegistrationEligibilityService();
