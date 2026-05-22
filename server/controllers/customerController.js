import Customer from '../models/Customer.js';

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, sortBy = 'name' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const customers = await Customer.find(query)
      .populate('assignedTo', 'name email')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: 1 });

    const totalCount = await Customer.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      count: customers.length,
      customers,
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

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('assignedTo', 'name email phone');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Create customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, industry, location, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer with this email already exists',
      });
    }

    const customer = new Customer({
      name,
      email,
      phone,
      company,
      industry,
      location,
      address,
    });

    await customer.save();

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, industry, location, address, status, assignedTo } = req.body;

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    if (name) customer.name = name;
    if (email && email !== customer.email) {
      const exists = await Customer.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
      customer.email = email;
    }
    if (phone) customer.phone = phone;
    if (company) customer.company = company;
    if (industry) customer.industry = industry;
    if (location) customer.location = location;
    if (address) customer.address = address;
    if (status) customer.status = status;
    if (assignedTo) customer.assignedTo = assignedTo;
    customer.updatedAt = new Date();

    await customer.save();

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };
