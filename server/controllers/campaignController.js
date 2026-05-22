import Campaign from '../models/Campaign.js';

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;

    const campaigns = await Campaign.find(query)
      .populate('owner', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalCount = await Campaign.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      campaigns,
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

// Create campaign
const createCampaign = async (req, res) => {
  try {
    const { name, description, type, budget, startDate, endDate } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Campaign name is required',
      });
    }

    const campaign = new Campaign({
      name,
      description,
      type,
      budget,
      startDate,
      endDate,
      owner: req.user._id,
    });

    await campaign.save();

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const { name, description, type, budget, spend, status, startDate, endDate } = req.body;

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    if (name) campaign.name = name;
    if (description) campaign.description = description;
    if (type) campaign.type = type;
    if (budget) campaign.budget = budget;
    if (spend !== undefined) campaign.spend = spend;
    if (status) campaign.status = status;
    if (startDate) campaign.startDate = startDate;
    if (endDate) campaign.endDate = endDate;
    campaign.updatedAt = new Date();

    await campaign.save();

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign };
