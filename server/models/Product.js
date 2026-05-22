import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  sku: {
    type: String,
    unique: true,
  },
  category: String,
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  status: {
    type: String,
    enum: ['active', 'beta', 'deprecated', 'planned'],
    default: 'active',
  },
  version: String,
  features: [String],
  documentation: String,
  specifications: mongoose.Schema.Types.Mixed,
  releaseDate: Date,
  deprecationDate: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const Product = mongoose.model('Product', productSchema);
export default Product;
