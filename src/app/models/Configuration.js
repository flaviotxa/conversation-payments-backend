import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['stripe', 'applepay'],
    default: 'stripe',
  },
  providerAccountSid: String,
  providerToken: String,
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);
