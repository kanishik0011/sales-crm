import mongoose from 'mongoose';

const accountPlanSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  accountManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  goals: [
    {
      description: String,
      targetValue: Number,
      currentValue: Number,
      dueDate: Date,
    },
  ],
  stakeholders: [
    {
      name: String,
      title: String,
      email: String,
      phone: String,
    },
  ],
  riskFactors: [String],
  opportunities: [String],
  competitiveAnalysis: String,
  renewalDate: Date,
  contractValue: Number,
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

const AccountPlan = mongoose.model('AccountPlan', accountPlanSchema);
export default AccountPlan;
