import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const BookingModal = ({ 
  show, 
  movie, 
  onHide, 
  onSubmit,
  isLoading,
  error 
}) => {
  const [formData, setFormData] = useState({
    tickets: 1,
    seats: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Reset form when modal is shown/hidden
  useEffect(() => {
    if (!show) {
      setFormData({ tickets: 1, seats: '' });
      setValidationErrors({});
    }
  }, [show]);

  const getAvailableTickets = () => movie?.totalTickets - movie?.bookedTickets;

  const validateForm = () => {
    const errors = {};
    const seatCount = formData.seats.split(',').filter(s => s.trim()).length;

    if (formData.tickets < 1) {
      errors.tickets = 'Minimum 1 ticket required';
    } else if (formData.tickets > getAvailableTickets()) {
      errors.tickets = `Only ${getAvailableTickets()} tickets available`;
    }

    if (!formData.seats.trim()) {
      errors.seats = 'Seat numbers required';
    } else if (seatCount !== formData.tickets) {
      errors.seats = `Enter exactly ${formData.tickets} seat(s)`;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    onSubmit({
      movieName: movie.movieName,
      theatreName: movie.theatreName,
      numberOfTickets: formData.tickets,
      seatNumbers: formData.seats.split(',').map(s => s.trim())
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'tickets' ? Math.max(1, value) : value
    }));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Book Tickets for {movie?.movieName}
          <div className="text-muted small mt-1">
            {movie?.theatreName} | Available: {getAvailableTickets()}
          </div>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tickets Required</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={getAvailableTickets()}
              value={formData.tickets}
              onChange={(e) => handleInputChange('tickets', parseInt(e.target.value))}
              isInvalid={!!validationErrors.tickets}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.tickets}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Seat Numbers</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example: A1, A2, B3"
              value={formData.seats}
              onChange={(e) => handleInputChange('seats', e.target.value)}
              isInvalid={!!validationErrors.seats}
              disabled={isLoading}
            />
            <Form.Text className="text-muted">
              Enter comma-separated seat numbers
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {validationErrors.seats}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={onHide}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;