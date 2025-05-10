import MovieSelector from '../../components/MovieSelector';
import { Toaster } from 'react-hot-toast';

export default function Movies() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <MovieSelector />
      <Toaster />
    </div>
  );
}