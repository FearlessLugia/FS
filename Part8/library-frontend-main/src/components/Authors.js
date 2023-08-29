import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries'
import { useMemo, useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

  const [UpdateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    UpdateAuthor({ variables: { name, setBornTo: born } })

    setName('')
    setBorn(0)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {authors.map((a) => (
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            options={authors.map(author => (
              {
                label: author.name,
                value: author.name
              }
            ))}
            onChange={({ value }) => setName(value)} />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
