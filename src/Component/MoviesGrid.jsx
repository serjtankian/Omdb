import styles from "./MoviesGrid.module.css"
import { MovieCard } from "./MovieCard"
import { useQuery } from "../hooks/useQuery"
import { useEffect, useState } from "react"
import axios from "axios"


/* const Search = "robot" */
export default function MoviesGrid() {

    const query = useQuery()
    const search = query.get("search")


    const portada = "world"
    let url

    search ? url = `http://www.omdbapi.com/?s=${search}&apikey=2ab0b313` : url = `http://www.omdbapi.com/?s=${portada}&apikey=2ab0b313`

    const [movies, setmovies] = useState([])
    useEffect(() => {
        axios
            .get(url)
            .then(response => setmovies(response.data.Search));
    }, [search]);

    return (<ul className={styles.moviesGrid}>

        {movies ? movies.map(movie => {

            return (<MovieCard key={movie.imdbID} movie={movie} />
            )
        }) : <p>No se encontraron resultados</p>}

    </ul>)

}

