'use client';

import { Suspense } from 'react';
import RegisterForm from '../../../components/RegisterForm';
import { Toaster } from 'react-hot-toast';

export default function Register() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
      <Toaster />
    </div>
  );
}
