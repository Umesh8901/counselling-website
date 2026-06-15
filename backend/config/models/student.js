const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true, required: true },
  personalInfo: {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true, match: /^\d{10}$/ },
    emailAddress: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    category: { type: String, enum: ['OPEN', 'OBC', 'SC', 'ST', 'EWS'], required: true }
  },
  academicInfo: {
    tenthPercentage: { type: Number, required: true },
    twelfthPercentage: { type: Number, required: true },
    mhtCetPercentile: { type: Number, required: true },
    jeeMainRank: { type: Number },
    pcmMarks: { type: Number, required: true }
  },
  preferences: {
    preferredBranch: [{ type: String }],
    preferredCollege: [{ type: String }],
    scholarshipRequired: { type: String, enum: ['Yes', 'No'], default: 'No' }
  },
  counselling: {
    mode: { type: String, enum: ['Online', 'Offline'], required: true },
    preferredDate: { type: Date, required: true },
    additionalNotes: { type: String }
  },
  documents: {
    sscMarksheet: { type: Boolean, default: false },
    hscMarksheet: { type: Boolean, default: false },
    cetScorecard: { type: Boolean, default: false },
    jeeScorecard: { type: Boolean, default: false },
    domicileCertificate: { type: Boolean, default: false },
    casteCertificate: { type: Boolean, default: false },
    incomeCertificate: { type: Boolean, default: false }
  },
  admissionStatus: { 
    type: String, 
    enum: ['Pending', 'Verified', 'Counselling Scheduled', 'Rejected', 'Admission Confirmed'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);