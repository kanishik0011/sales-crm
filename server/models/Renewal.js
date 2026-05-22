import mongoose from 'mongoose';

const renewalSchema = new mongoose.Schema({
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
  product: String,
  contractValue: Number,
  renewalDate: Date,
  daysUntilRenewal: Number,
  status: {
    type: String,
    enum: ['at_risk', 'tracking', 'closed_won', 'closed_lost'],
    default: 'tracking',
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  reason: String,
  notes: String,
  lastContactDate: Date,
  nextFollowUpDate: Date,
  outcome: String,
  renewedValue: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Renewal = mongoose.model('Renewal', renewalSchema);
export default Renewal;
