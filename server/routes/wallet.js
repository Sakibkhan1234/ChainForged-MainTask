const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');

// Add wallet to the database
router.post('/', async (req, res) => {
  const { address, balance } = req.body;

  try {
    const newWallet = new Wallet({ address, balance });
    await newWallet.save();
    res.json(newWallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all wallets
router.get('/', async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
