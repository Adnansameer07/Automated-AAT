const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    assessmentTitle: { type: String, required: true },
    date: { type: Date, default: Date.now },
    score: { type: Number },
    maxScore: { type: Number },
    remarks: { type: String },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Record', RecordSchema);

