// hooks/useAdminAuth.ts
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAdmin, clearAdmin } from '@/store/adminAuthSlice';

export default function useAdminAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/me`, {
          withCredentials: true,
        });
        dispatch(setAdmin(res.data.admin));
      } catch {
        dispatch(clearAdmin());
      }
    };

    checkAdmin();
  }, [dispatch]);
}
