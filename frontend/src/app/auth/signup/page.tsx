'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

type SignupForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: SignupForm) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`, data, { withCredentials: true});

      if (res.status === 201) {
        dispatch(setUser(res.data.user));
        toast.success('Signup successful!');
        router.push('/');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 px-4 text-black">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-5 bg-white p-8 rounded-2xl shadow-xl transition-all duration-300">
        
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register('firstName', { required: 'First name is required' })}
            className="  w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Last Name"
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Phone Number"
            {...register('phoneNumber', { required: 'Phone number is required' })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200">
          Sign Up
        </button>
      
      </form>
    
    </main>
  );
}
