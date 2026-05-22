import Feedback from '../models/Feedback.js';

// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, productId } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (type) query.type = type;
    if (status) query.status = status;
    if (productId) query.productId = productId;

    const feedback = await Feedback.find(query)
      .populate('productId', 'name')
      .populate('customerId', 'name company')
      .populate('userId', 'name')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalCount = await Feedback.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
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

// Create feedback
const createFeedback = async (req, res) => {
  try {
    const { type, title, description, productId, priority } = req.body;

    if (!type || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Type, title, and description are required',
      });
    }

    const feedback = new Feedback({
      type,
      title,
      description,
      productId,
      priority,
      userId: req.user._id,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback created successfully',
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update feedback
const updateFeedback = async (req, res) => {
  try {
    const { title, description, priority, status, response } = req.body;

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    if (title) feedback.title = title;
    if (description) feedback.description = description;
    if (priority) feedback.priority = priority;
    if (status) feedback.status = status;
    if (response) {
      feedback.response = response;
      feedback.respondedBy = req.user._id;
      feedback.respondedAt = new Date();
    }
    feedback.updatedAt = new Date();

    await feedback.save();

    res.status(200).json({
      success: true,
      message: 'Feedback updated successfully',
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getAllFeedback, createFeedback, updateFeedback, deleteFeedback };
