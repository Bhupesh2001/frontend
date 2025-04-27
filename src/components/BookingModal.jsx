import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const BookingModal = ({ show, movie, onHide, onSubmit }) => {
  const [tickets, setTickets] = useState(1);
  const [seats, setSeats] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (tickets < 1) newErrors.tickets = 'Minimum 1 ticket required';
    if (tickets > (movie.totalTickets - movie.bookedTickets)) {
      newErrors.tickets = `Only ${movie.totalTickets - movie.bookedTickets} tickets available`;
    }
    if (!seats.trim()) newErrors.seats = 'Seat numbers required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    onSubmit({
      movieName: movie.movieName,
      theatreName: movie.theatreName,
      numberOfTickets: tickets,
      seatNumbers: seats.split(',').map(s => s.trim())
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Tickets for {movie?.movieName}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={tickets}
              onChange={(e) => setTickets(Math.max(1, e.target.value))}
              isInvalid={!!errors.tickets}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tickets}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Seat Numbers (comma separated)</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g., A1, A2, B3"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              isInvalid={!!errors.seats}
            />
            <Form.Control.Feedback type="invalid">
              {errors.seats}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;