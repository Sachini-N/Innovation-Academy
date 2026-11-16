import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.js';
import { mockStore } from '../config/mockStore.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Submit contact message from homepage
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, programOfInterest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.',
      });
    }

    if (isDbConnected()) {
      const contact = await ContactMessage.create({
        name,
        email: email.toLowerCase(),
        subject: subject || 'General Inquiry / Program Expression',
        programOfInterest: programOfInterest || '',
        message,
        status: 'Unread',
      });
      return res.status(201).json({
        success: true,
        data: contact,
        message: 'Thank you for contacting TRACE Sri Lanka! Our innovation team has received your message.',
      });
    }

    // In-memory fallback
    const newMsg = {
      _id: `mock_cnt_${Date.now()}`,
      id: `mock_cnt_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      subject: subject || 'General Inquiry / Program Expression',
      programOfInterest: programOfInterest || '',
      message,
      status: 'Unread',
      createdAt: new Date(),
    };

    mockStore.contactMessages.unshift(newMsg);
    res.status(201).json({
      success: true,
      data: newMsg,
      message: 'Thank you for contacting TRACE Sri Lanka! Our innovation team has received your message.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (admin)
export const getAllContactMessages = async (req, res, next) => {
  try {
    const { status } = req.query;

    if (isDbConnected()) {
      const filter = status ? { status } : {};
      const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }

    let list = [...mockStore.contactMessages];
    if (status) list = list.filter((m) => m.status === status);
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact message status (admin)
export const updateContactMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, replyNotes } = req.body;

    if (isDbConnected()) {
      const contact = await ContactMessage.findById(id);
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }
      if (status) contact.status = status;
      if (replyNotes !== undefined) contact.replyNotes = replyNotes;
      await contact.save();
      return res.json({ success: true, data: contact, message: 'Message updated successfully' });
    }

    const msg = mockStore.contactMessages.find((m) => m._id === id || m.id === id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    if (status) msg.status = status;
    if (replyNotes !== undefined) msg.replyNotes = replyNotes;

    res.json({ success: true, data: msg, message: 'Message updated successfully' });
  } catch (error) {
    next(error);
  }
};
