import axios from 'axios'
const blogUrl = '/api/blogs'
const userUrl = '/api/users'

const getAll = () => {
  const request = axios.get(blogUrl)
  return request.then(response => response.data)
}
const addNewBlog = async (newBlog, user) => {
  const request = axios.post(blogUrl, newBlog, {headers: {'Content-Type': 'application/json','Authorization': `bearer ${user.token}`}} )
  // käytetään await
  const response = await request
  return response.data
}
const updateBlog = async (updatedBlog, user) => {
  const request = axios.put((`${blogUrl}/${updatedBlog.id}`), updatedBlog, {headers: {'Content-Type': 'application/json','Authorization': `bearer ${user.token}`}})
  // käytetään await
  const response = await request
  return response.data
}
const deleteBlog = (id, user) => {
  const request = axios.delete((`${blogUrl}/${id}`), {headers: {'Content-Type': 'application/json','Authorization': `bearer ${user.token}`}})
  // käytetään then
  return request.then(response => response.data)
}
  

export default { getAll, addNewBlog, updateBlog, deleteBlog }