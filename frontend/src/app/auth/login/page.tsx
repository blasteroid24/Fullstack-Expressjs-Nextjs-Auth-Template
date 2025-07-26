'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

type LoginForm = {email: string; password: string};

export default function LoginPage() {
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, data, {withCredentials: true});

      if (res.status === 200) {
        dispatch(setUser(res.data.user));
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

return (
  <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6 transition-all duration-300">
      
      <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
      <p className="text-sm text-center text-gray-500">Please enter your login credentials</p>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="example@mail.com"
          {...register('email', { required: 'Email is required' })}
          className="text-black w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          {...register('password', { required: 'Password is required' })}
          className="text-black w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        />

      </div>

      <button type="submit" className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition">
        Log In
      </button>

      <p className="text-xs text-center text-gray-400">Don't have an account?
         <span className="text-black font-medium cursor-pointer"><Link href="/auth/signup">Sign up</Link></span>
      </p>
      
    </form>
  </main>

)}
