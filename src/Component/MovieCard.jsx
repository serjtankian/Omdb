import styles from "./MovieCard.module.css"
import { Link } from "react-router-dom"

export function MovieCard({ movie }) {


    return <li className={styles.movieCard}>
        <Link to={`/movies/${movie.imdbID}`}>
            <img width={300}
                height={450}
                className={styles.movieImage}
                src={movie.Poster}
                alt={movie.Title} />
            <div> {(movie.Title)} </div>

        </Link>

    </li>
}

