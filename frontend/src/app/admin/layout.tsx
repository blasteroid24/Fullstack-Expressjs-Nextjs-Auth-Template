'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { useAppDispatch } from '@/hooks/hooks';
import { setAdmin, clearAdmin } from '@/store/adminAuthSlice';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/me`, { withCredentials: true, });

        dispatch(setAdmin(res.data.admin));
      }
      catch (error) {
        dispatch(clearAdmin());

        if (pathname !== '/admin') {
          router.replace('/admin');
        }
      }
    };

    validateAdmin();
  }, [dispatch, router, pathname]);

  return <>{children}</>;
}
