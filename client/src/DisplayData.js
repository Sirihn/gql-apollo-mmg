import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client"

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

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            id
            name
            yearOfPublication
        }
    }
`
const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input){
            name
            id
        }
    }
`

function DisplayData() {
    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, {data: movieSearchedData, error: movieError}] = useLazyQuery(GET_MOVIE_BY_NAME);

    const [movieSearched, setMovieSearched] = useState("");

    //create user states
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    const [CreateUser] = useMutation(CREATE_USER);

    const handleCreateUser = async () => {
        await CreateUser({
            variables: {
                input: {
                    name,
                    username,
                    age:Number(age),
                    nationality
                }
            }
        });

        refetch();
    }

    if(loading){
        return <h1> DATA IS LOADING </h1>
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Name..." 
                onChange={(event) => { setName(event.target.value);}}></input>
                <input type="text" placeholder="Username..."
                onChange={(event) => { setUsername(event.target.value);}}></input>
                <input type="Number" placeholder="Age..."
                onChange={(event) => { setAge(event.target.value);}}></input>
                <input type="text" placeholder="Nationality..."
                onChange={(event) => { setNationality(event.target.value.toUpperCase());}}></input>
                <button onClick={() => {handleCreateUser()}}>Create User</button>
            </div>
            {data && data.users.map((user) => {
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
            <button onClick={() => {
                fetchMovie({variables: {name: movieSearched}});
            }}>Fetch Data</button>
            <div>
                {movieSearchedData && <div>
                    <h1>Movie Name: {movieSearchedData.movie.name}</h1>
                    <h1>Year of Publication: {movieSearchedData.movie.yearOfPublication}</h1>
                </div>}
                {movieError && <h1>Fetch error</h1>}
            </div>
        </div>
        </div>
    );
}

export default DisplayData;