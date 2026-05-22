import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  company: String,
  industry: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'],
    default: 'new',
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'campaign', 'event', 'cold_call', 'other'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  convertedCustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  qualificationScore: Number,
  budget: Number,
  timeline: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
