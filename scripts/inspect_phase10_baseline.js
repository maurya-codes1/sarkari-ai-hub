// scripts/inspect_phase10_baseline.js
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../backend/db/sarkari_core.db');
const db = new Database(dbPath);

console.log('=== DATABASE INVENTORY AUDIT ===');
const totalQ = db.prepare('SELECT count(*) as c FROM questions').get().c;
console.log('Total Questions:', totalQ);

const provCounts = db.prepare('SELECT provenance, count(*) as c FROM questions GROUP BY provenance').all();
console.log('Provenance Breakdown:', provCounts);

const practiceCount = db.prepare('SELECT count(*) as c FROM questions WHERE practice_eligible = 1').get().c;
console.log('Practice Eligible:', practiceCount);

const fullExamGateService = require('../backend/services/full-exam-gate-service');
const cglEval = fullExamGateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
const upscEval = fullExamGateService.evaluateExamReadiness('upsc-cse', 'ver-upsc-cse-2026', db);
const gdEval = fullExamGateService.evaluateExamReadiness('ssc-gd', 'ver-ssc-gd-2026', db);
const alpEval = fullExamGateService.evaluateExamReadiness('rrb-alp', 'ver-rrb-alp-2026', db);
const ntpcEval = fullExamGateService.evaluateExamReadiness('rrb-ntpc', 'ver-rrb-ntpc-2026', db);

console.log('\n=== COMPONENT READINESS EVALUATION ===');
console.log('SSC CGL:', cglEval.isEligible ? 'READY' : 'BLOCKED', `(Eligible: ${cglEval.eligibleCount}/${cglEval.requiredCount})`);
console.log('UPSC CSE:', upscEval.isEligible ? 'READY' : 'BLOCKED', `(Eligible: ${upscEval.eligibleCount}/${upscEval.requiredCount})`);
console.log('SSC GD:', gdEval.isEligible ? 'READY' : 'BLOCKED', `(Eligible: ${gdEval.eligibleCount}/${gdEval.requiredCount})`, gdEval.blockingReasons);
console.log('RRB ALP:', alpEval.isEligible ? 'READY' : 'BLOCKED', `(Eligible: ${alpEval.eligibleCount}/${alpEval.requiredCount})`, alpEval.blockingReasons);
console.log('RRB NTPC:', ntpcEval.isEligible ? 'READY' : 'BLOCKED', `(Eligible: ${ntpcEval.eligibleCount}/${ntpcEval.requiredCount})`, ntpcEval.blockingReasons);

const integrity = db.prepare('PRAGMA integrity_check').get();
const fks = db.prepare('PRAGMA foreign_key_check').all();
console.log('\n=== DB PRAGMA HEALTH ===');
console.log('integrity_check:', integrity.integrity_check);
console.log('foreign_key_check violations:', fks.length);
