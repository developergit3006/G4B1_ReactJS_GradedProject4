import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MovieCard from "./MovieCard"
import IMovieList from "../model/IMovieList"
import { fetchMoviesList } from "../services/FetchData"
import React from "react"


type Props = {
  searchValue: string
}

export default function Main({ searchValue }: Props) {
    const [moviesData, setMoviesData] = useState<IMovieList[]>([])
    const [filteredMovies, setFilteredMovies] = useState<IMovieList[]>([])
    const location = useLocation()

    let tabName: string | undefined = location.state?.tab || "movies-in-theaters"

    const fetchMovies = async () => {
        try {
          const movies = await fetchMoviesList(tabName)
          setMoviesData(movies)
        } catch (error: any) {
          console.error(error)
        }
    }

    useEffect(() => {
        fetchMovies()
      }, [tabName]
    )

    useEffect(() => {
        const filteredData = searchValue
          ? moviesData.filter((movie) =>
            movie.title.toLowerCase().includes(searchValue)
          )
          : moviesData
        setFilteredMovies(filteredData)
      }, [moviesData, searchValue]
    )

    return (
        <>
          {filteredMovies.length === 0 ? (
            <h2 style={{ color: "black", fontWeight: 700, textAlign: "center", marginTop: "20%" }}>No data found</h2>
                       ) : (filteredMovies.map((movie) => (
                            <MovieCard
                              key={movie.id}
                              movie={movie}
                              tabName={tabName}
                              fetchMovies={fetchMovies}
                            />
                          ))
                       )}
         </>
    )
}