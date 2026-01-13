import express from 'express';
import db from '../db/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const profile = await db.getProfile();
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/experience', async (req, res) => {
  try {
    const experience = await db.getExperience();
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
