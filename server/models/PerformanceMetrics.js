import mongoose from 'mongoose';

const performanceMetricsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annual'],
    required: true,
  },
  date: Date,
  metrics: {
    activitiesLogged: Number,
    callsMade: Number,
    meetingsScheduled: Number,
    opportunitiesCreated: Number,
    opportunitiesClosed: Number,
    revenue: Number,
    pipelineValue: Number,
    winRate: Number,
    averageDealSize: Number,
  },
  targets: {
    activitiesTarget: Number,
    callsTarget: Number,
    revenueTarget: Number,
  },
  achievements: [String],
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

const PerformanceMetrics = mongoose.model('PerformanceMetrics', performanceMetricsSchema);
export default PerformanceMetrics;
