/* eslint-disable react/prop-types */
function ListOfMovies({movies}){
  return (
    <ul>
      {
        movies.map( movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <img src={movie.img} alt={movie.Title} />
          </li>
        ))
      }
    </ul>
  )
}

function NoMovies(){
  return (
    <p>Not found any result for that search</p>
  )
}

export function RenderMovies({movies}){
  const hasMovies = movies?.length > 0
  return(
    hasMovies ? <ListOfMovies movies={movies}/>: <NoMovies />
  )
}