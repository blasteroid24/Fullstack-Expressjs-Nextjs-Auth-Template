'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { authInit } from '@/hooks/useUserAuth';
import { useAppDispatch } from '@/hooks/hooks';

function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authInit());
  }, [dispatch]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
}
