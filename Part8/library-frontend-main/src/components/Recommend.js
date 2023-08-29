import { useState } from 'react'

const Recommend = ({ show, books }) => {
  const [genre, setGenre] = useState('')

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <span>books in your favorite genre {genre}</span>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
