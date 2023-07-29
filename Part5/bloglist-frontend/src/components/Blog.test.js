import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// describe('<Blog />',()=>{
//   let container
//
//   beforeEach(()=>{
//     container = render(
//       <Blog blog={blog} addLike={() => addLike(blog)} removeBlog={() => removeBlog(blog)}
//             user={user}/>)
//   })
// })

test('renders title and author', () => {
  const blog = { title: 'title test', author: 'author test', url: 'url test' }
  const user = { id: 'idtest', username: 'username test' }
  const { container } = render(
    <Blog blog={blog} addLike={() => addLike(blog)} removeBlog={() => removeBlog(blog)}
          user={user}/>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('title test author test')
  expect(div).not.toHaveTextContent('url test')
  expect(div).not.toHaveTextContent('likes')
})

test('checks url and likes after clicking the button', async () => {
  const blog = { title: 'title test', author: 'author test', url: 'url test', user: { username: 'username test' } }
  const user = { username: 'username test' }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} removeBlog={() => removeBlog(blog)}
          user={user}/>)

  const usertest = userEvent.setup()
  const button = screen.getByText('view')
  await usertest.click(button)

  // expect(mockHandler.mock.calls).toHaveLength(1)

  screen.debug()

  const element1 = screen.getByText('url test')
  expect(element1).toBeDefined()
  const element2 = screen.getByText('likes')
  expect(element2).toBeDefined()
})

test('clicking the likes twice calls event handler twice', async () => {
  const blog = {
    title: 'title test',
    author: 'author test',
    url: 'url test',
    likes: 0,
    user: { username: 'username test' }
  }
  const user = { username: 'username test' }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} removeBlog={() => null}
          user={user}/>)

  const usertest = userEvent.setup()
  const viewButton = screen.getByText('view')
  await usertest.click(viewButton)
  const likeButton = screen.getByText('like')
  await usertest.click(likeButton)
  await usertest.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})