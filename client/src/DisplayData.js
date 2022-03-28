import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client"

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            name
        }
    }
`;

function DisplayData() {
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    
    const [movieSearched, setMovieSearched] = useState("");

    if(loading){
        return <h1> DATA IS LOADING </h1>
    }
    if(data){
        console.log(data);
    }
    if(error){
        console.log(error);
    }

    return (
        <div>{data && data.users.map((user) => {
            return <div>
                <h1>Name: {user.name} </h1>
                <h1>Username: {user.username} </h1>
                <h1>Age: {user.age} </h1>
                <h1>Id: {user.id} </h1>
                <h1>Nationality: {user.nationality} </h1>
            </div>
        })}
        
        {movieData && movieData.movies.map((movie) => {
            return <div>
                <h1>Movie Title: {movie.name}</h1>
            </div>
        })}


        <div>
            <input type="text" placeholder="Interstellar..." onChange={(event) => {
                setMovieSearched(event.target.value);
            }}/>
            <button>Fetch Data</button>
            <div>

            </div>
        </div>
        </div>
    );
}

export default DisplayData;