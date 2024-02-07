import blogService from '../services/blogs'

const Blog = ({ blog, blogs, user, setBlogs }) => {
  const deleteBlog = async (e,id) => {
    e.preventDefault();
    console.log("User :" + user)
    console.log("Id :" + id)
    try {
      await blogService.deleteBlog(id, user)
      setBlogs(blogs.filter(blog => blog.id!== id))
    } catch (exception) {
      setErrorMessage('wrong blog id')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const editBlog = async (e, blog) => {

  }
  return (
  <div>
    {blog.title} {blog.author} {blog.url}
    <button onClick={(e) => editBlog(e, blog)}>Edit Blog</button>
    <button onClick={(e) => deleteBlog(e, blog.id)}>Delete Blog</button>
  </div>  
  )
}
export default Blog