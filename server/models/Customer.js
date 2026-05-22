import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: String,
  company: String,
  industry: String,
  location: String,
  address: String,
  website: String,
  status: {
    type: String,
    enum: ['active', 'inactive', 'lost'],
    default: 'active',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  primaryContact: {
    name: String,
    email: String,
    phone: String,
    title: String,
  },
  metadata: {
    annualRevenue: Number,
    employeeCount: Number,
    yearFounded: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
