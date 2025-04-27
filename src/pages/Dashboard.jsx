import React, { useState} from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import BookingModal from '../components/BookingModal';
import api from '../services/api';
import useMovies from '../context/useMovies';


const Dashboard = () => {
  const { movies, isLoading, fetchError, refreshMovies } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({ 
    error: '', 
    success: '', 
    isLoading: false 
  });

  const handleBooking = async (bookingData) => {
    if (!selectedMovie) return;
    
    setBookingStatus({
      error: '',
      success: '',
      isLoading: true
    });

    try {
      await api.post(`/${encodeURIComponent(bookingData.movieName)}/add`, bookingData);
      
      // Refresh data from server for accuracy
      await refreshMovies();

      setBookingStatus({
        error: '',
        success: `Successfully booked ${bookingData.numberOfTickets} tickets!`,
        isLoading: false
      });
      setSelectedMovie(null);
    } catch (error) {
      setBookingStatus({
        error: error.response?.data?.message || 'Booking failed. Please try again.',
        success: '',
        isLoading: false
      });
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Now Showing</h1>

      {fetchError && <Alert variant="danger">{fetchError}</Alert>}
      {bookingStatus.success && (
        <Alert variant="success" dismissible 
          onClose={() => setBookingStatus(prev => ({ ...prev, success: '' }))}>
          {bookingStatus.success}
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading movies...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {movies.map((movie) => (
            <Col key={`${movie.movieName}-${movie.theatreName}`}>
              <MovieCard
                movie={movie}
                onBook={() => setSelectedMovie(movie)}
              />
            </Col>
          ))}
        </Row>
      )}

      <BookingModal
        show={!!selectedMovie}
        movie={selectedMovie}
        onHide={() => {
          setSelectedMovie(null);
          setBookingStatus(prev => ({ ...prev, error: '' }));
        }}
        onSubmit={handleBooking}
        isLoading={bookingStatus.isLoading}
        error={bookingStatus.error}
      />
    </Container>
  );
};

export default Dashboard;