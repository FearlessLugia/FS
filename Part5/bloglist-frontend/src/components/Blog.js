import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>

      {visible && <>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.username}</div>
        {blog.user.username === user.username && <div>
          <button onClick={removeBlog}>remove</button>
        </div>}
      </>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog