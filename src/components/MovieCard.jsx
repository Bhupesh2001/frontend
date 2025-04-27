import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Body>
        <Card.Title>{movie.movieName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{movie.theatreName}</Card.Subtitle>
        <Card.Text>
          Tickets Available: {movie.totalTickets - movie.bookedTickets}
          <br />
          Status: {movie.ticketStatus}
        </Card.Text>
        <Button variant="primary">Book Tickets</Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;