import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser, clearUser } from '../store/authSlice';

export const authInit = createAsyncThunk('auth/init', async (_, { dispatch }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, { withCredentials: true, });
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(clearUser());
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`, {}, {
      withCredentials: true,
    });
    dispatch(clearUser());
  } catch (error) {
    console.error("Logout failed", error);
  }
});
