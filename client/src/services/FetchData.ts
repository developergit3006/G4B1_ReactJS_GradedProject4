
import axios from "axios"
import IMovieList from "../model/IMovieList"

export const fetchMoviesList = async (movieListType: string | undefined) => {
  const Api = `${process.env.REACT_APP_API_BASE_URL}/${movieListType}`
  return await axios.get(Api).then((res) => res.data)
}

export const fetchMovie = async (tab?: string, movieId?: string) => {
  if (movieId) {
    const Api = `${process.env.REACT_APP_API_BASE_URL}/${tab}?id=${movieId}`
    return axios.get(Api).then((response) => response.data)
  }
  const Api = `${process.env.REACT_APP_API_BASE_URL}/${tab}`
  return axios.get(Api).then((response) => response.data)
}

export const fetchFavouriteMovies = async (movieName?: string) => {
  if (typeof movieName == "string") {
    const Api = `${process.env.REACT_APP_API_BASE_URL}/favourite?title=${movieName}`
    return axios.get(Api).then((response) => response.data)
  }
  return axios.get(`${process.env.REACT_APP_API_BASE_URL}/favourite`).then((response) => response.data)
}

export const addMovieToFavourites = async (movie: IMovieList) => {
  return axios.post(`${process.env.REACT_APP_API_BASE_URL}/favourite`, movie, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.status)
}

export const removeMovieFromFavourites = async (movieId: number) => {
  const Api = `${process.env.REACT_APP_API_BASE_URL}/favourite/${movieId}`
  return axios.delete(Api).then((response) => response.status)
}