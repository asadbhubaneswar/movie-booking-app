import { Suspense } from 'react';
import MovieSelector from '../../components/MovieSelector';
import { Toaster } from 'react-hot-toast';

export default function Movies() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <Suspense fallback={<div>Loading...</div>}>
      <MovieSelector />
      </Suspense>
      <Toaster />
    </div>
  );
}