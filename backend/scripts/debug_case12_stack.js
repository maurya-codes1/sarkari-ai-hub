const mockService = require('../services/mock-service');

try {
  mockService.startMockSession({
    boardId: 'upmsp-board',
    stage: 'Class 12',
    testMode: 'PRACTICE',
    subjectId: 'subj-physics',
    requestedCount: 500
  });
} catch (e) {
  console.error('Stack trace:');
  console.error(e.stack);
}
