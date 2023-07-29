import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('write blog title here')
  const authorInput = screen.getByPlaceholderText('write blog author here')
  const urlInput = screen.getByPlaceholderText('write blog url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'title test')
  await user.type(authorInput, 'author test')
  await user.type(urlInput, 'url test')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title test')
  expect(createBlog.mock.calls[0][0].author).toBe('author test')
  expect(createBlog.mock.calls[0][0].url).toBe('url test')
})