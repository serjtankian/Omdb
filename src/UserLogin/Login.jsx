import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPasword] = useState("")






    useEffect(() => {
        axios.post("/api/login", { email, password })
            .then(r => r.data)
            .catch(e => console.log(e))
        console.log("llegando al back")
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("enviando")

    }


    return (
        <form onSubmit={handleSubmit} >
            <div className="form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">
                    Email
                </label>
                <div className="col-sm-2">
                    <input type="email" className="form-control" id="inputEmail3" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
            </div>
            <div className="form-group row">
                <label for="inputPassword3" className="col-sm-3 col-form-label">
                    Password
                </label>
                <div className="col-sm-2">
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword3"
                        onChange={(e) => setPasword(e.target.value)}
                    ></input>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-2">
                    <button type="submit" className="btn btn-primary" >
                        enviar
                    </button>
                </div>
            </div>
        </form>
    )
};


