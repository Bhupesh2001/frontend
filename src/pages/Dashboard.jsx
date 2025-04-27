import React from 'react';
import { Container } from 'react-bootstrap';
import MovieCard from '../components/MovieCard.jsx';

const Dashboard = () => {
  // You'll need to fetch movies from API here
  const dummyMovies = [
    {
      id: 1,
      movieName: "Avengers Endgame",
      theatreName: "PVR Cinemas",
      totalTickets: 100,
      bookedTickets: 30,
      ticketStatus: "BOOK ASAP"
    }
  ];

  return (
    <Container>
      <h1 className="my-4">Now Showing</h1>
      <div className="d-flex flex-wrap">
        {dummyMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </Container>
  );
};

export default Dashboard;