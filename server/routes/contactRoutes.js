import express from 'express';
import {
  submitContactMessage,
  getAllContactMessages,
  updateContactMessageStatus,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', protect, adminOnly, getAllContactMessages);
router.put('/:id', protect, adminOnly, updateContactMessageStatus);

export default router;

