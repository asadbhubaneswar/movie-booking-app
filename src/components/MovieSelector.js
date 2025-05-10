"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';

export default function MovieSelector() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [seatCount, setSeatCount] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get('/movies');
        setMovies(res.data);
      } catch (error) {
        toast.error('Failed to fetch movies');
      }
    };
    fetchMovies();
  }, []);

  const handleGo = () => {
    if (!selectedMovie) return toast.error('Please select a movie');
    if (seatCount < 1 || seatCount > 10) return toast.error('Seats must be between 1 and 10');
    router.push(`/seats?movieId=${selectedMovie}&seatCount=${seatCount}`);
  };

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Select Movie and Seats</h1>
      <Select onValueChange={setSelectedMovie}>
        <SelectTrigger className="w-full text-base sm:text-lg">
          <SelectValue placeholder="Select a movie" />
        </SelectTrigger>
        <SelectContent>
          {movies.map((movie) => (
            <SelectItem key={movie._id} value={movie._id} className="text-base">
              {movie.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        value={seatCount}
        onChange={(e) => setSeatCount(e.target.value)}
        placeholder="Number of seats (1-10)"
        className="mt-4 text-base sm:text-lg h-12"
      />
      <Button onClick={handleGo} className="mt-4 w-full h-12 text-base sm:text-lg">
        Go
      </Button>
    </div>
  );
}