import { Suspense } from 'react';
import SeatGrid from '../../components/SeatGrid';
import { Toaster } from 'react-hot-toast';

export default function Seats() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
       <SeatGrid />
      </Suspense>
      <Toaster />
    </div>
  );
}