import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const MovieCard = ({ movie, onBook }) => {
  const isAvailable = movie.ticketStatus === 'BOOK ASAP';
  
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {movie.movieName}
          <Badge bg={isAvailable ? "success" : "danger"}>
            {movie.ticketStatus}
          </Badge>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {movie.theatreName}
        </Card.Subtitle>
        <Card.Text>
          <span className="d-block">Total Tickets: {movie.totalTickets}</span>
          <span className="d-block">Booked: {movie.bookedTickets}</span>
          <strong>Available: {movie.totalTickets - movie.bookedTickets}</strong>
        </Card.Text>
        <Button 
          variant="primary" 
          onClick={() => onBook(movie)}
          disabled={!isAvailable}
        >
          {isAvailable ? "Book Tickets" : "Sold Out"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;