import PerformanceMetrics from '../models/PerformanceMetrics.js';
import Activity from '../models/Activity.js';
import Opportunity from '../models/Opportunity.js';

// Get dashboard metrics
const getDashboardMetrics = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get activities for current month
    const activities = await Activity.countDocuments({
      userId,
      createdAt: { $gte: startOfMonth },
    });

    // Get opportunities for current month
    const opportunities = await Opportunity.countDocuments({
      userId,
      createdAt: { $gte: startOfMonth },
    });

    // Get total pipeline value
    const pipeline = await Opportunity.aggregate([
      { $match: { userId, status: 'active' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Get revenue from closed opportunities
    const revenue = await Opportunity.aggregate([
      { $match: { userId, stage: 'Closed Won', createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.status(200).json({
      success: true,
      metrics: {
        activitiesCount: activities,
        opportunitiesCount: opportunities,
        pipelineValue: pipeline[0]?.total || 0,
        monthlyRevenue: revenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get performance metrics
const getPerformanceMetrics = async (req, res) => {
  try {
    const { userId, period = 'monthly' } = req.query;

    const metrics = await PerformanceMetrics.findOne({
      userId,
      period,
    }).populate('userId', 'name email');

    if (!metrics) {
      return res.status(404).json({
        success: false,
        message: 'Performance metrics not found',
      });
    }

    res.status(200).json({
      success: true,
      metrics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getDashboardMetrics, getPerformanceMetrics };
