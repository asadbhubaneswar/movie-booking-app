"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api, { setAuthToken } from '../utils/api';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { getToken, getUser, removeToken, removeUser } from '../utils/auth';

export default function Summary() {
  const [movie, setMovie] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const movieId = searchParams.get('movieId');
  const seats = searchParams.get('seats')?.split(',');
  const user = getUser();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies`);
        const movie = res.data.find((m) => m._id === movieId);
        setMovie(movie);
      } catch (error) {
        toast.error('Failed to fetch movie details');
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleConfirm = async () => {
    try {
      // the setAuthToken generates a secured api url defined in utils/api.js
      // and the getToken function is used to get the token from localStorage
      setAuthToken(getToken());
      // Calculate total price (Rs 20 per seat)
      const totalPrice = seats.length * 20;
      await api.post('/bookings', { movieId, seats, userId: user._id, totalPrice });
      toast.success('Booking confirmed!');
      // Clearing localStorage (user and token). This called functions are defined in utils/auth.js 
      removeToken();
      removeUser();
      router.push('/movies');
    } catch (error) {
      toast.error('Failed to confirm booking');
    }
  };

  if (!movie || !user) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Booking Summary</h1>
      <div className="border p-4 sm:p-6 rounded-lg shadow-sm">
        <p className="text-sm sm:text-base mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="text-sm sm:text-base mb-2"><strong>Movie:</strong> {movie.title}</p>
        <p className="text-sm sm:text-base mb-2"><strong>Seats:</strong> {seats.join(', ')}</p>
        <p className="text-sm sm:text-base mb-2"><strong>Total Seats:</strong> {seats.length}</p>
        <p className="text-sm sm:text-base"><strong>Total Price:</strong> ${seats.length * 20}</p>
      </div>
      <Button onClick={handleConfirm} className="mt-4 w-full h-12 text-base sm:text-lg">
        Confirm Booking
      </Button>
    </div>
  );
}