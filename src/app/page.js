"use client"
import { useState } from 'react';
import Link from 'next/link';
import AdminLoginModal from '../components/AdminLoginModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4 sm:p-6 relative">
      {/* Admin Login Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-blue-600"
      >
        Admin Login
      </button>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center">
          World's No.1 Movie Booking App
        </h1>
        <Link href="/movies">
          <button className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-base sm:text-lg hover:bg-blue-600">
            Book Now
          </button>
        </Link>
      </div>
      {/* Admin Login Modal */}
      <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}