"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api, { setAuthToken } from '../utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { saveToken, saveUser } from '../utils/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get('movieId');
  const seats = searchParams.get('seats');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setAuthToken(res.data.token);
      saveToken(res.data.token);
      saveUser(res.data.user);
      toast.success('Logged in successfully');
      // Redirect to summary if movieId and seats are provided, else to /movies
      if (movieId && seats) {
        router.push(`/summary?movieId=${encodeURIComponent(movieId)}&seats=${encodeURIComponent(seats)}`);
      } else {
        router.push('/movies');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  // Url paramenter won't change if user toggles from login to register or vice-versa.
  const registerLink = movieId && seats
    ? `/register?movieId=${encodeURIComponent(movieId)}&seats=${encodeURIComponent(seats)}`
    : '/register';

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
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
          Login
        </Button>
      </form>
      <p className="mt-4 text-center text-sm sm:text-base">
         Don&#39;t have an account?{' '}
        <Link href={registerLink} className="text-blue-500 hover:underline">
         Register
       </Link>
    </p>

    </div>
  );
}