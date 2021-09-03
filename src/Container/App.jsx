
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"
import MovieDetails from "../Component/MovieDetails";
import LandingPage from "../Component/LandingPage";
import Navbar from "../Component/Navbar";
import Login from "../UserLogin/Login";
import React from "react";
import Register from "../UserLogin/Register";





export default function App() {

    return (


        <Router>
            <header>
                <Link to="/">
                    <h1>Trucho-movies.com</h1>
                </Link>
                <Navbar />
                <br />
            </header>
            <main>
                <Switch>
                    <Route exact path="/login" render={() => <Login />} />
                    <Route exact path="/register" render={() => <Register />} />
                    <Route path="/movies/:movieId">
                        <MovieDetails />
                    </Route>
                    <Route path="/">
                        <LandingPage />
                    </Route>


                </Switch>
            </main>
        </Router>

    )

}

