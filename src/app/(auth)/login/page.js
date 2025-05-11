'use client';
import { Suspense } from 'react';
import LoginForm from '../../../components/LoginForm';
import { Toaster } from 'react-hot-toast';

export default function Login() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
      <Toaster />
    </div>
  );
}
