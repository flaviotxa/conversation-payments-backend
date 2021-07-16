import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  amount: Number,
  currency: String,
  description: String,
  conversationSid: String,
  url: String,
  stripeSessionId: String,
});

module.exports = mongoose.model('Payment', PaymentSchema);
