import { useMemo, useState } from 'react'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('')

  const showBooks = useMemo(() => {
    if (genre === '') {
      return books
    }
    return books.filter(b => b.genres.includes(genre))
  }, [books, genre])

  if (!show) {
    return null
  }

  const handleGenre = (g) => {
    setGenre(g)
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <span>in genre {genre}</span>}
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {showBooks.map((a) =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>)}
        </tbody>
      </table>

      {[...new Set(books.map(b => b.genres).flat())].map(g =>
        <button key={g} value={genre} onClick={() => handleGenre(g)}>{g}</button>
      )}
    </div>
  )
}

export default Books
