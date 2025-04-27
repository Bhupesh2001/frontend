import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import BookingModal from '../components/BookingModal';
import api from '../services/api';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/all');
        setMovies(response.data);
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);


  const handleBooking = async (bookingData) => {
    try {
      setLoading(true);
      await api.post(
        `/${encodeURIComponent(bookingData.movieName)}/add`,
        bookingData
      );
      
      // Update local state
      setMovies(prev => prev.map(m => 
        m.id === selectedMovie.id ? {
          ...m,
          bookedTickets: m.bookedTickets + bookingData.numberOfTickets,
          ticketStatus: (m.totalTickets - (m.bookedTickets + bookingData.numberOfTickets)) <= 0 
            ? 'SOLD OUT' 
            : 'BOOK ASAP'
        } : m
      ));
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Now Showing</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Row xs={1} md={2} lg={3} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard 
              movie={movie} 
              onBook={() => setSelectedMovie(movie)}
            />
          </Col>
        ))}
      </Row>

      <BookingModal
        show={!!selectedMovie}
        movie={selectedMovie}
        onHide={() => setSelectedMovie(null)}
        onSubmit={handleBooking}
      />
    </Container>
  );
};

export default Dashboard;