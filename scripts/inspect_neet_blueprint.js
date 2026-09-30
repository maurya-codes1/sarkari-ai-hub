const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

const unified = require('../backend/services/unified-exam-truth-service');
const cfg = unified.getMockConfiguration('nta-neet');
console.log('unified config for nta-neet:');
console.log(cfg);

const mockService = require('../backend/services/mock-service');
const res = mockService.startMockSession({
  examId: 'nta-neet',
  testMode: 'FULL_EXAM_PATTERN'
});
console.log('mockService.startMockSession res:', res);
