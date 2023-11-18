import { RenderMovies } from './components/RenderMovies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import './App.css'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const {search, setSearch, error}= useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    // const formData = new window.FormData(event.target)
    // const searchInput = formData.get('searchInput')
    getMovies({search})
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='app'>

      <header className='header'>
        <h1>The movie Search</h1>
        <form className='header-form' onSubmit={handleSubmit}>
          <input
          style={{border:'1px solid transparent', borderColor: error ? 'tomato' : 'transparent'}}
          onChange={handleChange}
          // name='searchInput'
          value={search}
          className='header-form-input'
          placeholder='Avatar'
          ></input>
          <button
          className='header-form-button'
          type='submit'
          >Search</button>
        </form>
        {error && <p style={{color:'tomato'}}>{error}</p>}
        <div className='header-sort'>
          <h4>Order by Year</h4>
          <input 
          type='checkbox'
          onChange={handleSort}
          checked={sort}>
          </input>
        </div>
      </header>

      <main className='main'>
        {
          loading 
          ? <p>Loading, please wait...</p> 
          : <RenderMovies movies={movies}/> 
        }
      </main>
    </div>
  )
}

export default App
