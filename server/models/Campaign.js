import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['email', 'social', 'event', 'content', 'paid_ads', 'other'],
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'completed', 'archived'],
    default: 'planning',
  },
  budget: Number,
  spend: {
    type: Number,
    default: 0,
  },
  startDate: Date,
  endDate: Date,
  targetAudience: String,
  leadGoal: Number,
  leadsGenerated: {
    type: Number,
    default: 0,
  },
  conversionRate: Number,
  roi: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  channels: [String],
  metrics: {
    reach: Number,
    impressions: Number,
    clicks: Number,
    conversions: Number,
  },
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

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
