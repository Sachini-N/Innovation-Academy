import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { mockStore } from '../config/mockStore.js';

const isDbConnected = () => mongoose.connection.readyState === 1;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || 'trace_jwt_super_secret_key_2025',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, organization } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isDbConnected()) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.',
        });
      }

      const user = await User.create({
        name,
        email: cleanEmail,
        password,
        phone: phone || '',
        organization: organization || '',
        role: 'participant',
      });

      const token = generateToken(user);
      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          organization: user.organization,
        },
        message: 'Account created successfully. Welcome to TRACE Sri Lanka!',
      });
    }

    // In-memory fallback
    const existing = mockStore.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    const newUser = {
      _id: `mock_usr_${Date.now()}`,
      id: `mock_usr_${Date.now()}`,
      name,
      email: cleanEmail,
      password: bcrypt.hashSync(password, 10),
      role: 'participant',
      phone: phone || '',
      organization: organization || '',
      bio: '',
      avatar: '',
      createdAt: new Date(),
    };

    mockStore.users.push(newUser);
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        organization: newUser.organization,
      },
      message: 'Account created successfully. Welcome to TRACE Sri Lanka!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isDbConnected()) {
      const user = await User.findOne({ email: cleanEmail });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const token = generateToken(user);
      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          organization: user.organization,
          bio: user.bio,
          avatar: user.avatar,
        },
        message: `Welcome back, ${user.name}!`,
      });
    }

    // In-memory fallback
    const user = mockStore.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        organization: user.organization,
        bio: user.bio,
        avatar: user.avatar,
      },
      message: `Welcome back, ${user.name}!`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;

    if (isDbConnected()) {
      const user = await User.findById(userId).select('-password');
      if (user) {
        return res.json({ success: true, user });
      }
    }

    // In-memory fallback
    const user = mockStore.users.find((u) => u._id === userId || u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    const { password, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, phone, organization, bio, avatar } = req.body;

    if (isDbConnected()) {
      const user = await User.findById(userId);
      if (user) {
        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (organization !== undefined) user.organization = organization;
        if (bio !== undefined) user.bio = bio;
        if (avatar !== undefined) user.avatar = avatar;

        const updated = await user.save();
        return res.json({
          success: true,
          message: 'Profile updated successfully',
          user: updated,
        });
      }
    }

    // In-memory fallback
    const user = mockStore.users.find((u) => u._id === userId || u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (organization !== undefined) user.organization = organization;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    const { password, ...safeUser } = user;
    res.json({ success: true, message: 'Profile updated successfully', user: safeUser });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password',
      });
    }

    if (isDbConnected()) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password does not match' });
      }
      user.password = newPassword;
      await user.save();
      return res.json({ success: true, message: 'Password updated successfully' });
    }

    // In-memory fallback
    const user = mockStore.users.find((u) => u._id === userId || u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password does not match' });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};
