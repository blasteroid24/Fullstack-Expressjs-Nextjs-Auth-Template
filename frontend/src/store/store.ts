import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import adminAuthReducer from './adminAuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
