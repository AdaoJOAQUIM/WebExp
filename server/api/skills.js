import express from 'express';
import db from '../db/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const skills = await db.getSkills();
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
