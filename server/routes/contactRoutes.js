import express from 'express';
import {
  submitContactMessage,
  getAllContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', protect, adminOnly, getAllContactMessages);
router.put('/:id', protect, adminOnly, updateContactMessageStatus);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

export default router;

