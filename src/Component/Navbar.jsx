import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from "../hooks/useQuery"
import { Link } from "react-router-dom"

export default function Navbar() {
    const query = useQuery()
    const search = query.get("search")


    const [searchText, setSearchtext] = useState("")
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("enviando")
        history.push("/?search=" + searchText)
    }
    useEffect(() => {
        setSearchtext(search || "")
    }, [search])

    const Pair = ({ children }) => (
        <div className="flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
            {children}
        </div>
    );


    const EmptyButton = ({ children }) => (
        <button className="btn btn-outline-success" >
            {children}
        </button>
    );
    const RoundButton = ({ children, onClick = () => { } }) => (
        <span className="inline-flex rounded-md shadow-sm">
            <button
                onClick={onClick}
                className="btn btn-outline-success"
            >
                {children}
            </button>
        </span>
    );

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <form className="d-flex" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="text"
                    value={searchText} onChange={(e) => setSearchtext(e.target.value)} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div>
                <Pair>
                    <Link to="/login">
                        <EmptyButton>Login</EmptyButton>
                    </Link>
                    <Link to="/register">
                        <RoundButton>Register</RoundButton>
                    </Link>
                </Pair>
            </div>
        </div>
    </nav>)
}