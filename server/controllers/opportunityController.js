import Opportunity from '../models/Opportunity.js';

// Get all opportunities
const getAllOpportunities = async (req, res) => {
  try {
    const { page = 1, limit = 10, stage, status, customerId } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (stage) query.stage = stage;
    if (status) query.status = status;
    if (customerId) query.customerId = customerId;

    const opportunities = await Opportunity.find(query)
      .populate('customerId', 'name company')
      .populate('userId', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ expectedCloseDate: 1 });

    const totalCount = await Opportunity.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities,
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

// Create opportunity
const createOpportunity = async (req, res) => {
  try {
    const { title, customerId, amount, stage, probability, expectedCloseDate, description } = req.body;

    if (!title || !customerId || !amount || !stage) {
      return res.status(400).json({
        success: false,
        message: 'Title, customerId, amount, and stage are required',
      });
    }

    const opportunity = new Opportunity({
      title,
      customerId,
      userId: req.user._id,
      amount,
      stage,
      probability: probability || 50,
      expectedCloseDate,
      description,
    });

    await opportunity.save();

    res.status(201).json({
      success: true,
      message: 'Opportunity created successfully',
      opportunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update opportunity
const updateOpportunity = async (req, res) => {
  try {
    const { title, amount, stage, probability, expectedCloseDate, status, closeReason, nextStep, notes } = req.body;

    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found',
      });
    }

    if (title) opportunity.title = title;
    if (amount) opportunity.amount = amount;
    if (stage) opportunity.stage = stage;
    if (probability !== undefined) opportunity.probability = probability;
    if (expectedCloseDate) opportunity.expectedCloseDate = expectedCloseDate;
    if (status) opportunity.status = status;
    if (closeReason) opportunity.closeReason = closeReason;
    if (nextStep) opportunity.nextStep = nextStep;
    if (notes) opportunity.notes = notes;
    opportunity.updatedAt = new Date();

    await opportunity.save();

    res.status(200).json({
      success: true,
      message: 'Opportunity updated successfully',
      opportunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete opportunity
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Opportunity deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getAllOpportunities, createOpportunity, updateOpportunity, deleteOpportunity };
