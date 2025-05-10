import SeatGrid from '../../components/SeatGrid';
import { Toaster } from 'react-hot-toast';

export default function Seats() {
  return (
    <div>
      <SeatGrid />
      <Toaster />
    </div>
  );
}