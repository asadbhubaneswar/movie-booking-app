import { Suspense } from 'react';
import Summary from '../../components/Summary';
import { Toaster } from 'react-hot-toast';

export default function SummaryPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <Summary />
      </Suspense>
      <Toaster />
    </div>
  );
}