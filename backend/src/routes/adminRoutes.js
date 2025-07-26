//imports
import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';

import { generateToken, verifyToken } from '../utils/tokenUtils.js';
import logErrorToDB from '../utils/errorLogger.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role = 'admin',
    } = req.body;

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        twoFactorEnabled: false,
        failedLoginAttempts: 0,
      },
    });

    const token = generateToken({ id: newAdmin.id, role: newAdmin.role });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV==="production", 
      sameSite: 'lax',
    });

    res.status(201).json({ message: 'Admin signup successful' });
  } catch (error) {
    await logErrorToDB('admin_signup', error.message, req.originalUrl);
    res.status(500).json({ error: 'Signup failed' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          failedLoginAttempts: { increment: 1 },
        },
      });

      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Reset failed attempts and update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        failedLoginAttempts: 0,
        lastLoginAt: new Date(),
      },
    });

    const token = generateToken({ id: admin.id, role: admin.role });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV==="production",
      sameSite: 'lax',
    });

    res.status(200).json({ message: 'Admin login successful' });
  } catch (error) {
    await logErrorToDB('admin_login', error.message, req.originalUrl);
    res.status(500).json({ error: 'Login failed' });
  }
});


router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyToken(token);
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        lastLoginAt: true,
        twoFactorEnabled: true,
      },
    });

    res.status(200).json(admin);
  } catch (error) {
    await logErrorToDB('admin_me', error.message, req.originalUrl);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Admin logged out successfully' });
  } catch (error) {
    await logErrorToDB('admin_logout', error.message, req.originalUrl);
    res.status(500).json({ error: 'Logout failed' });
  }
});


router.get('/logs', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyToken(token);
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const logs = await prisma.log.findMany({ orderBy: { timestamp: 'desc' },take: 100, });

    res.status(200).json(logs);
  } catch (error) {
    console.log(error)
    await logErrorToDB('admin_logs_fetch', error.message, req.originalUrl);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});


export default router;
