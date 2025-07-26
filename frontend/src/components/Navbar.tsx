'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import { logoutUser } from '@/hooks/useUserAuth';


export default function UserNavbar() {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const getInitial = (name: string) => name?.charAt(0)?.toUpperCase() || '';

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">Requiem</Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/home" className="text-gray-700 hover:text-indigo-600 transition">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-indigo-600 transition">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</Link>
        </div>


        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm shadow-md">
                {getInitial(user.firstName)}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 border border-red-600 px-3 py-1.5 rounded-md text-sm hover:bg-red-600 hover:text-white transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition"
              >
                <LogIn size={16} />
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center gap-1 border border-indigo-600 text-indigo-600 px-4 py-1.5 rounded-md text-sm hover:bg-indigo-600 hover:text-white transition"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
