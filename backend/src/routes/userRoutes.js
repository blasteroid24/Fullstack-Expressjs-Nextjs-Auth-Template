//imports
import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';


import { generateToken, verifyToken } from '../utils/tokenUtils.js';
import logErrorToDB from '../utils/errorLogger.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const data = req.body
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
      },
    });

    const token = generateToken({ id: newUser.id, role: 'user' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
    });

    res.status(201).json({
      message: 'Signup successful',
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      }
    });

  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user.id, role: 'user' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
    });

    res.status(200).json({ 
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      } });
  }
  catch (error) {
    await logErrorToDB('login', error.message, req.originalUrl);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, firstName: true, lastName: true, email: true, phoneNumber: true },
    });

    res.status(200).json(user);
  } catch (error) {
    await logErrorToDB('me', error.message, req.originalUrl);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    await logErrorToDB('logout', error.message, req.originalUrl);
    res.status(500).json({ error: 'Logout failed' });
  }
});

export default router;