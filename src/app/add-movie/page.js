"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { Toaster } from 'react-hot-toast';
import { isAdmin, removeAdmin } from '../../utils/auth';

export default function AddMovie() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [movies, setMovies] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0); // This will trigger re-fetching of movies after POST without re-loading page.
  const router = useRouter();

  
  if (!isAdmin()) {
    router.push('/'); 
    return null;
  }

  // It will fetch movies on mount and when updateTrigger changes
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
  }, [updateTrigger]);

  // This will add movies by admin
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await api.post('/movies', { title, description });
      toast.success('Movie added successfully');
      setTitle('');
      setDescription('');
      setUpdateTrigger((prev) => prev + 1); // Triggers re-fetch of movies by incrementing updateTrigger and re-run of useEffect hook
    } catch (error) {
      toast.error('Failed to add movie');
    }
  };


  const handleLogout = () => {
    removeAdmin();
    toast.success('Admin logged out');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-full sm:max-w-2xl bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Add New Movie</h1>
        <form onSubmit={handleAddMovie} className="space-y-4 mb-8">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Movie Title"
            className="h-10 text-base"
            required
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Movie Description"
            className="text-base"
            rows={4}
          />
          <Button type="submit" className="w-full h-10 text-base">
            Add Movie
          </Button>
        </form>

        {/* This displays movie list */}
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Movie List</h2>
        {movies.length === 0 ? (
          <p className="text-center text-sm sm:text-base">No movies found.</p>
        ) : (
          <ul className="space-y-4">
            {movies.map((movie) => (
              <li key={movie._id} className="border p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{movie.description || 'No description'}</p>
              </li>
            ))}
          </ul>
        )}

        
        <Button
          onClick={handleLogout}
          className="w-full h-10 text-base mt-6 bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
      <Toaster />
    </div>
  );
}