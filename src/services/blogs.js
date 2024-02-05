import axios from 'axios'
const blogUrl = '/api/blogs'
const userUrl = '/api/users'

const getAll = () => {
  const request = axios.get(blogUrl)
  return request.then(response => response.data)
}
const addNewBlog = async (newBlog, user) => {
  console.log(user)
  // hae token ja liitä se Autohorization
  const request = axios.post(blogUrl, newBlog, {headers: {'Content-Type': 'application/json','Authorization': `bearer ${user.token}`}} )
  
  const response = await request
  return response.data
}
const deleteBlog = (id, user) => {
  // hae token ja liitä se Autohorization
  const request = axios.delete(`${blogUrl}/${id}`).set("Authorization", `Bearer ${user.token}`)
  return request.then(response => response.data)
}
  

export default { getAll, addNewBlog, deleteBlog }