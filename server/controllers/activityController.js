import Activity from '../models/Activity.js';

// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, customerId } = req.query;
    const skip = (page - 1) * limit;

    let query = { userId: req.user._id };
    if (type) query.type = type;
    if (status) query.status = status;
    if (customerId) query.customerId = customerId;

    const activities = await Activity.find(query)
      .populate('customerId', 'name company')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const totalCount = await Activity.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
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

// Create activity
const createActivity = async (req, res) => {
  try {
    const { type, title, description, customerId, date, duration, status } = req.body;

    if (!type || !title || !customerId || !date) {
      return res.status(400).json({
        success: false,
        message: 'Type, title, customerId, and date are required',
      });
    }

    const activity = new Activity({
      type,
      title,
      description,
      customerId,
      userId: req.user._id,
      date,
      duration,
      status: status || 'planned',
    });

    await activity.save();

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update activity
const updateActivity = async (req, res) => {
  try {
    const { type, title, description, date, duration, status, outcome, notes } = req.body;

    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    if (type) activity.type = type;
    if (title) activity.title = title;
    if (description) activity.description = description;
    if (date) activity.date = date;
    if (duration) activity.duration = duration;
    if (status) activity.status = status;
    if (outcome) activity.outcome = outcome;
    if (notes) activity.notes = notes;
    activity.updatedAt = new Date();

    await activity.save();

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
      activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete activity
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getAllActivities, createActivity, updateActivity, deleteActivity };
