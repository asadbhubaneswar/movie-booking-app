"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { getToken } from '../utils/auth';

export default function SeatGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const movieId = searchParams.get('movieId');
  const seatCount = parseInt(searchParams.get('seatCount')) || 1;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // It will fetch booked seats for the movie
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await api.get(`/bookings?movieId=${movieId}`);
        setBookedSeats(res.data);
      } catch (error) {
        toast.error('Failed to fetch booked seats');
      }
    };
    if (movieId) {
      fetchBookedSeats();
    }
  }, [movieId]);

  // It will gnerate seat grid (5 rows x 5 columns)
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5];
  const seats = rows.flatMap((row) => cols.map((col) => `${row}${col}`));

  // selection and deselection
  const toggleSeat = (seat) => {
    
    if (bookedSeats.includes(seat)) return;

    // undo seat selection function
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      return;
    }

    // Select if under seat count limit
    if (selectedSeats.length < seatCount) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      toast.error(`You can only select ${seatCount} seats`);
    }
  };

 
  const handleBook = () => {
    if (selectedSeats.length !== seatCount) {
      return toast.error(`Please select exactly ${seatCount} seats`);
    }
    if (!getToken()) {
      router.push(`/login?movieId=${encodeURIComponent(movieId)}&seats=${encodeURIComponent(selectedSeats.join(','))}`);
    } else {
      router.push(`/summary?movieId=${encodeURIComponent(movieId)}&seats=${encodeURIComponent(selectedSeats.join(','))}`);
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Select Your Seats</h1>
      <p className="text-sm sm:text-base mb-4 text-center">
        Select {seatCount} seat{seatCount > 1 ? 's' : ''}.
      </p>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            disabled={bookedSeats.includes(seat)}
            className={`h-10 sm:h-12 text-sm sm:text-base rounded-lg flex items-center justify-center transition-colors
              ${bookedSeats.includes(seat)
                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                : selectedSeats.includes(seat)
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {bookedSeats.includes(seat) ? '✕' : seat}
          </button>
        ))}
      </div>
      <Button onClick={handleBook} className="w-full h-12 text-base sm:text-lg">
        Book Seats
      </Button>
    </div>
  );
}