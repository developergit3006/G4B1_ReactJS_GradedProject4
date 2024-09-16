import React from "react";
import { Fragment, useEffect, useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { fetchMovie } from "../services/FetchData"
import "../styles/MovieInfo.css"
import IMovieList from "../model/IMovieList";



function MovieInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabName = location.state?.tab
  const movieId = location.state?.id
  const [movieData, setMovieData] = useState<IMovieList[]>([])
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const fetchMovieDetails = async (movieId: string) => {
      try {
        const movie = await fetchMovie(tabName, movieId)
        setMovieData(movie)
      } catch (error: any) {
        console.error(error)
      }
  }

  useEffect(() => {
      fetchMovieDetails(movieId)
    }, [])

  const handleGoBack = () => {
      navigate(-1);
    };

  const handleImageClick = () => {
      setIsImagePreviewOpen(!isImagePreviewOpen);
    };

  return (
    <>
      <Link to="/" className="back-to-prev" onClick={handleGoBack} replace>
        Back to prev page
      </Link>

      {movieData.map((movie) => (
        <Fragment key={movie.id}>
          <div className="movie-details-container">
            <div
              className="movie-details-image"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
              >
                <img
                  src={movie.posterurl}
                  alt={movie.title}
                  onClick={handleImageClick}
                />
                {isImageHovered && (
                  <div className="image-preview-text" onClick={handleImageClick}>Preview</div>
                )}
            </div>
            <div className="movie-details-details">
              <h2>{`${movie.title} (${movie.releaseDate?.slice(0, 4)})`}</h2>
              <div className="movie-details-rating">
                <div className="movie-details-label">IMDb Rating:</div>
                <div className="movie-details-value">{movie.imdbRating}</div>
              </div>
              <div className="movie-details-rating">
                <div className="movie-details-label">Content Rating:</div>
                <div className="movie-details-value">
                  {movie.contentRating}
                </div>
              </div>
              <div className="movie-details-rating">
                <div className="movie-details-label">Average Rating:</div>
                <div className="movie-details-value">
                  {movie.averageRating}
                </div>
              </div>
              <div className="movie-details-rating">
                <div className="movie-details-label">Duration:</div>
                <div className="movie-details-value">{movie.duration}</div>
              </div>
              <div className="movie-details-rating">
                <div className="movie-details-label">Genres:</div>
                <div className="movie-details-value">
                  {movie.genres?.join()}
                </div>
              </div>
              <div className="movie-details-rating">
                <div className="movie-details-label">Actors:</div>
                <div className="movie-details-value">
                  {movie.actors?.join()}
                </div>
              </div>
              <div className="movie-details-rating">
                <div className="movie-details-label">Release Date:</div>
                <div className="movie-details-value">{movie.releaseDate}</div>
              </div>
              <div className="movie-details-rating">
                <div className="movie-details-label">Storyline:</div>
                <div className="movie-details-value-storyline">{movie.storyline}</div>
              </div>
            </div>
          </div>
        </Fragment>
        ))
      }
      {isImagePreviewOpen && (
        <div className="image-preview-overlay" onClick={handleImageClick}>
          <div className="image-preview-content">
            <img src={movieData[0]?.posterurl} alt={movieData[0]?.title} />
            <div className="close-icon" onClick={handleImageClick}>
              &#10006;
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default MovieInfo