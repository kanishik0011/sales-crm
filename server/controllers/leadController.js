import Lead from '../models/Lead.js';

// Get all leads
const getAllLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, source } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;
    if (source) query.source = source;

    const leads = await Lead.find(query)
      .populate('assignedTo', 'name email')
      .populate('campaignId', 'name')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalCount = await Lead.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
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

// Create lead
const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, industry, source, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    const lead = new Lead({
      name,
      email,
      phone,
      company,
      industry,
      source,
      notes,
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update lead
const updateLead = async (req, res) => {
  try {
    const { name, email, phone, company, industry, status, assignedTo, rating, budget, timeline, notes } = req.body;

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    if (name) lead.name = name;
    if (email) lead.email = email;
    if (phone) lead.phone = phone;
    if (company) lead.company = company;
    if (industry) lead.industry = industry;
    if (status) lead.status = status;
    if (assignedTo) lead.assignedTo = assignedTo;
    if (rating) lead.rating = rating;
    if (budget) lead.budget = budget;
    if (timeline) lead.timeline = timeline;
    if (notes) lead.notes = notes;
    lead.updatedAt = new Date();

    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete lead
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getAllLeads, createLead, updateLead, deleteLead };
