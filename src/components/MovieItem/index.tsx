import { Grid } from '@mui/material';
import { Card, Badge, Row, Col } from 'react-bootstrap';

// Types
import IListMovie from 'src/types/list.movies.dto';

interface MovieItemProps {
  movieData: IListMovie;
}

const MovieItem = ({ movieData }: MovieItemProps) => {
  const a_stars = [movieData.star1, movieData.star2, movieData.star3, movieData.star4];
  return (
    <li className="list-group-item">
      <Row mt={2}>
        <Col xs={1} mt={4}>
          <img src={movieData.poster_link}></img>
        </Col>

        <Col xs={11}>
          <h4>{movieData.series_title}</h4>
          <p>{movieData.overview}</p>
          <p><b>Estrelando: {a_stars.join(", ")}</b></p>
          <span>Lançado em: {movieData.released_year}</span>
          <span>Gêneros: {movieData.genre}</span>
          <Grid border="1px solid red" display="flex" justifyContent="flex-end">
            <Badge bg="secondary">IMDb Rating: {movieData.imdb_raiting}</Badge>
          </Grid>
        </Col>
      </Row>
    </li>
  )
};

export default MovieItem;

