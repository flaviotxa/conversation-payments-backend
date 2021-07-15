import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending',
  },
  amount: Number,
  currency: String,
  description: String,
  conversationSid: String,
});

module.exports = mongoose.model('Payment', PaymentSchema);
