import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.put(`${baseUrl}/${blog.id}`,
    {
      ...blog,
      likes: blog.likes + 1
    },
    config)
  return request.then(response => response.data)
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

// eslint-disable-next-line
export default { setToken, getAll, create, update, remove }