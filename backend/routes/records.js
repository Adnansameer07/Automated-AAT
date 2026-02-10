const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Record = require('../models/Record');

router.post('/', auth, async (req, res) => {
  try {
    const rec = new Record({ ...req.body, submittedBy: req.user.id });
    await rec.save();
    res.json(rec);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const records = await Record.find()
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const rec = await Record.findById(req.params.id);
    if (!rec) return res.status(404).json({ message: 'Not found' });
    res.json(rec);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const rec = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rec);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

