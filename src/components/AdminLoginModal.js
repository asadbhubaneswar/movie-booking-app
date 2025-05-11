"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { setAdmin } from '../utils/auth';

export default function AdminLoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter email and password');
      return;
    }
    // Checking predefined credentials for admin login. Not like generic login for users
    if (email === 'admin@gmail.com' && password === 'admin') {
  toast.success('Admin logged in successfully');
  setAdmin();
  router.push('/add-movie');
  
  setTimeout(() => {
    onClose();  // Delay because the the homepage shows due to immediate login modal close
  }, 150); 
} else {
      toast.error('Invalid admin credentials');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-sm sm:max-w-md shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center text-gray-800">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-11 text-base sm:text-lg border-gray-300 focus:border-blue-500"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="h-11 text-base sm:text-lg border-gray-300 focus:border-blue-500"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              className="h-10 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="h-10 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}