"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api, { setAuthToken } from '../utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { saveToken, saveUser } from '../utils/auth';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get('movieId');
  const seats = searchParams.get('seats');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      setAuthToken(res.data.token);
      saveToken(res.data.token);
      saveUser(res.data.user);
      toast.success('Registered successfully');
      // Redirect to login with movieId and seats if provided, else to /login
      if (movieId && seats) {
        router.push(`/login?movieId=${encodeURIComponent(movieId)}&seats=${encodeURIComponent(seats)}`);
      } else {
        router.push('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  // using encodeURIComponent due spaces or certain special characters won't cause issues
  const loginLink = movieId && seats
    ? `/login?movieId=${encodeURIComponent(movieId)}&seats=${encodeURIComponent(seats)}`
    : '/login';

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="h-12 text-base sm:text-lg"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="h-12 text-base sm:text-lg"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="h-12 text-base sm:text-lg"
        />
        <Button type="submit" className="w-full h-12 text-base sm:text-lg">
          Register
        </Button>
      </form>
      <p className="mt-4 text-center text-sm sm:text-base">
        Already have an account?{' '}
        <Link href={loginLink} className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}