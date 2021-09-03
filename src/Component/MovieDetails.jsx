import styles from "./MovieDetails.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
export default function MovieDetails() {


    console.log(window.location.pathname.split("/movies/")[1])
    const movieId = window.location.pathname.split("/movies/")[1]
    const [movie, setmovie] = useState({})



    useEffect(() => {
        axios
            .get(`http://www.omdbapi.com/?i=${movieId}&apikey=2ab0b313`)
            .then(response => setmovie(response.data))
    }, [movieId]);




    return <div className={styles.detailContainer} key={movie.movieId} >
        <img width={400}
            height={600}
            className={styles.col + "" + styles.movieImage} src={movie.Poster}
            alt={movie.Title} />
        <div className={styles.col}  >
            <p><strong>Title: </strong>{movie.Title}</p>
            <p><strong>Genre: </strong>{movie.Genre}</p>
            <p><strong>Year: </strong>{movie.Year}</p>
            <p><strong>Description: </strong>{movie.Plot}</p>

        </div>
    </div>

}