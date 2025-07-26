'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/authSlice';
import toast from 'react-hot-toast';

export default function AdminNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      dispatch(clearUser());
      toast.success('Logged out successfully');
      router.push('/admin');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="w-full h-16 bg-black flex items-center justify-between px-6 shadow text-black">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-black px-3 py-1 rounded hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </nav>
  );
}
