// Libs
import moment from 'moment';

// Components
import {
  TableHead,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LayoutDefault from 'src/components/LayoutDefault';
import MovieItem from 'src/components/MovieItem';

// API
import { api } from "src/services/api";
import { useEffect, useState } from 'react';

// Types
import IListMovie from '../../../types/list.movies.dto';

const StyledTableHead = styled(TableHead)`
  background: none !important;
`;

const MoviesList = () => {
  const theme = useTheme();
  const [movies, setMovies] = useState<IListMovie[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredMovies, setFilteredMovies] = useState<IListMovie[]>([]);

  useEffect(() => {
    if (!movies.length) {
      getMovies();
    } else {
      filterMovies();
    }
  }, [searchText]);

  const getMovies = async () => {
    try {
      const response = await api.get(`api/v1/movies`);
      console.log(response.data);
      setMovies(response.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  }

  const filterMovies = () => {
    const filtered = movies.filter((movie) =>
      movie.series_title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <>
      <LayoutDefault
        title="Listar Filmes"
        subtitle=""
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ul className="list-group">
          {filteredMovies.map(movie => {
            return (
              <MovieItem key={movie.id} movieData={movie} />
            )
          })}
        </ul>
      </LayoutDefault>
    </>
  );
}

export default MoviesList;
