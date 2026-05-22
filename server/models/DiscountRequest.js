import mongoose from 'mongoose';

const discountRequestSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: String,
  originalPrice: Number,
  discountPercentage: Number,
  discountedPrice: Number,
  reason: String,
  justification: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rejectionReason: String,
  approvalDate: Date,
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

const DiscountRequest = mongoose.model('DiscountRequest', discountRequestSchema);
export default DiscountRequest;
