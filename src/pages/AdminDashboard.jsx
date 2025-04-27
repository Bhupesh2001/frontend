import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import api from '../services/api';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookingsRes = await api.get('/all-bookings');
      const moviesRes = await api.get('/all');
      setBookings(bookingsRes.data);
      setMovies(moviesRes.data);
    };
    fetchData();
  }, []);

  const updateTicketStatus = async (movieId, status) => {
    await api.put(`/${movieId}/update/${status}`);
    // Refresh data
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <h3>Bookings</h3>
      <Table striped bordered hover>
        {/* Bookings table */}
      </Table>
      
      <h3>Movies Management</h3>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-item">
            <span>{movie.movieName} - {movie.theatreName}</span>
            <Button 
              variant="warning" 
              onClick={() => updateTicketStatus(movie.id, 'SOLD_OUT')}>
              Mark as Sold Out
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;