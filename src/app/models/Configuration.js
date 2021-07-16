import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['stripe', 'applepay'],
    default: 'stripe',
  },
  providerKey: String,
  providerSecretKey: String,
  successUrl: String,
  cancelUrl: String,
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);
