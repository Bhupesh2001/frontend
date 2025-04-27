import { useState, useEffect } from 'react';
import api from '../services/api';

const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');
  
    const fetchMovies = async () => {
      try {
        const { data } = await api.get('/all');
        setMovies(data);
        setFetchError('');
      } catch (error) {
        setFetchError('Failed to load movies. Please refresh the page.');
        console.error('Fetch movies error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchMovies();
    }, []);
  
    return { movies, isLoading, fetchError, setMovies, refreshMovies: fetchMovies };
  };

  export default useMovies;