// store/adminAuthSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Admin = {
  id: number;
  name: string;
  email: string;
};

type AdminAuthState = {
  admin: Admin | null;
};

const initialState: AdminAuthState = {
  admin: null,
};

export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<Admin>) {
      state.admin = action.payload;
    },
    clearAdmin(state) {
      state.admin = null;
    },
  },
});

export const { setAdmin, clearAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
