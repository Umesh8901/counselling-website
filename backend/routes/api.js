const express = require('express');
const router = express.Router();
const { registerStudent, getAllStudents, updateStudentStatus, adminLogin } = require('../controllers/portalcontroller');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/admin/login', adminLogin);
router.post('/student/register', registerStudent);
router.get('/student', protectAdmin, getAllStudents);
router.put('/student/:id', protectAdmin, updateStudentStatus);

module.exports = router;