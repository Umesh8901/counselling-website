const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// 1. DATABASE CONNECTION (ASLI WALA)
// ----------------------------------------------------
// Yeh aapka apna personal MongoDB link hai jo image me tha
const MONGO_URI = "mongodb+srv://umeshagde123_db_user:ic18Yg08KS6OZmDh@student26.4ltq66l.mongodb.net/nagpur_admission?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Asli Database Connected Successfully!"))
  .catch((err) => console.log("Database Connection Error: ", err.message));

// ----------------------------------------------------
// 2. DATABASE SCHEMA (Model)
// ----------------------------------------------------
const StudentSchema = new mongoose.Schema({
  applicationId: { type: String },
  personalInfo: { fullName: String, mobileNumber: String, emailAddress: String, dateOfBirth: Date, gender: String, category: String },
  academicInfo: { tenthPercentage: Number, twelfthPercentage: Number, mhtCetPercentile: Number, jeeMainRank: Number, pcmMarks: Number },
  preferences: { preferredBranch: [String], preferredCollege: [String], scholarshipRequired: String },
  counselling: { mode: String, preferredDate: Date, additionalNotes: String },
  documents: { sscMarksheet: Boolean, hscMarksheet: Boolean, cetScorecard: Boolean, jeeScorecard: Boolean, domicileCertificate: Boolean, casteCertificate: Boolean, incomeCertificate: Boolean },
  admissionStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);

// ----------------------------------------------------
// 3. API ROUTES
// ----------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'umeshagde123' || username === 'hemantwanve123') && password === 'MYadmin@2004') {
    const token = jwt.sign({ username }, 'SUPER_SECURE_JWT_SECRET_KEY_NAGPUR_2026', { expiresIn: '1d' });
    return res.status(200).json({ success: true, token, username });
  }
  return res.status(401).json({ message: 'Invalid Admin Credentials' });
});

app.post('/api/student/register', async (req, res) => {
  try {
    const appNumber = 'NGP' + Math.floor(100000 + Math.random() * 900000);
    const newStudent = new Student({ applicationId: appNumber, ...req.body });
    await newStudent.save();
    res.status(201).json({ success: true, applicationId: appNumber, data: newStudent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/student', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/student/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ----------------------------------------------------
// 4. SERVER START
// ----------------------------------------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server executing safely on port ${PORT}`));