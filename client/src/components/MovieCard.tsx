import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {addMovieToFavourites, removeMovieFromFavourites,fetchFavouriteMovies} from "../services/FetchData";
import "../styles/MovieCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { ImHeart } from "react-icons/im";
import IMovieList from "../model/IMovieList";

type MovieCardProps = {
  movie: IMovieList;
  tabName: string | undefined;
  fetchMovies(): void;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, tabName, fetchMovies }) => {
  const navigate = useNavigate();

  const showSuccessToast = (message: string | JSX.Element) => {
    toast.success(
      <div>
        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
        <span>{message}</span>
      </div>,
      {
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
        className: 'custom-toast success-toast',
      }
    );
  };

  const showErrorToast = (message: string | JSX.Element) => {
    toast.error(
      <div>
        <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />
        <span>{message}</span>
      </div>,
      {
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
        className: 'custom-toast error-toast',
      }
    );
  };

  const addToFav = async (movie: IMovieList) => {
    let favorites = await fetchFavouriteMovies();

    let movieAlreadyexists = favorites.some(
      (favoriteMovie: IMovieList) => favoriteMovie.title === movie.title
    );

    if (movieAlreadyexists) {
      showErrorToast(
        <>
          error <br /><br />
          {movie.title} - already added to favourite
        </>
      );
      return;
    }

    const response = await addMovieToFavourites(movie);

    if (response === 201) {
      showSuccessToast(
        <>
          success <br /><br />
          {movie.title} - successfully added to favourite
        </>);
    } else {
      console.log(response);
    }
  };

  const removeFromFav = async (movie: IMovieList) => {
    const movieDetails = await fetchFavouriteMovies(movie.title);
    const response = await removeMovieFromFavourites(movieDetails[0].id);

    if (response === 200) {
      showSuccessToast(`${movie.title} - successfully removed from favourite`);
      fetchMovies();
    } else {
      showErrorToast(`Error! Unable to remove ${movie.title} from favourite`);
    }
  };

  const imageClick = async (movie: IMovieList) => {
    let url = `/${movie.title}`;
    navigate(url, { state: { tab: tabName, id: movie.id } });
  };

  return (
    <div className="movie-card" key={movie.id}>
      <img
        src={movie.posterurl}
        alt={movie.title}
        className="movie-card__image"
        onClick={() => imageClick(movie)}
      />
      <div className="movie-card__details">
        <h2 className="movie-card__title">{movie.title}</h2>
        {tabName === 'favourite' ? (
          <>
            <button className="Favourites" onClick={() => removeFromFav(movie)}>
              Remove from Favourites <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          </>
        ) : (
          <>
            <button className="Favourites" onClick={() => addToFav(movie)}>
              Add to Favourites <ImHeart style={{ color: 'red', fontSize: '15px' }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default MovieCard;