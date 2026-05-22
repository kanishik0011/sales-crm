import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  stage: {
    type: String,
    enum: ['Lead', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    required: true,
  },
  probability: {
    type: Number,
    min: 0,
    max: 100,
  },
  expectedCloseDate: Date,
  actualCloseDate: Date,
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
  closeReason: String,
  nextStep: String,
  nextStepDate: Date,
  competition: [String],
  notes: String,
  attachments: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
export default Opportunity;
