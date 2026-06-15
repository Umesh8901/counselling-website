const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// Predefined Hardcoded Admin Credentials as required
const VALID_ADMINS = {
  umeshagde123: 'MYadmin@2004',
  hemantwanve123: 'MYadmin@2004'
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (VALID_ADMINS[username] && VALID_ADMINS[username] === password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ success: true, token, username });
  }
  return res.status(401).json({ message: 'Invalid Admin Credentials' });
};

exports.registerStudent = async (req, res) => {
  try {
    const appNumber = 'NGP' + Math.floor(100000 + Math.random() * 900000);
    const newStudent = new Student({
      applicationId: appNumber,
      ...req.body
    });
    await newStudent.save();
    res.status(201).json({ success: true, applicationId: appNumber, data: newStudent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudentStatus = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};