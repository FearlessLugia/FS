import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [info, setInfo] = useState({ message: null })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const blogRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      blogService.getAll()
        .then(blogs => {
          blogs.sort((a, b) => b.likes - a.likes)
          setBlogs(blogs)
        })
    }
  }, [user])

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null })
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        const updatedBlog = { ...returnedBlog, user: user }
        setBlogs(blogs.concat(updatedBlog))
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const addLike = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject)

    setBlogs(blogs.map(blog => blog.id === returnedBlog.id
      ? { ...blog, likes: returnedBlog.likes }
      : blog
    ))
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.remove(blogObject)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={info}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info}/>
      <p>
        {user.username} logged in
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
        }}>logout</button>
      </p>
      {blogForm()}

      <div ref={blogRef}>
        {blogs.map(blog =>
          <Blog
            key={blog.id} blog={blog}
            addLike={() => addLike(blog)}
            removeBlog={() => removeBlog(blog)}
            user={user}/>
        )}
      </div>
    </div>
  )
}

export default App