const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  balance: { type: String, required: true },
});

module.exports = mongoose.model('Wallet', WalletSchema);
