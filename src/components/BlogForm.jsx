import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addNewBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: props.user.name,
      url: blogUrl,
    }
    try {
      const blog = await blogService.addNewBlog(newBlog, props.user)
      console.log(blog)
      props.setBlogs([...props.blogs, blog])
      setTitle('')
      setBlogUrl('')
      props.setInfoMessage('New blog "' + blog.title + '" is added')
      props.setBlogFormVisible(false)
      setTimeout(() => {
        props.setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      props.setErrorMessage(exception)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
        Title
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
         Blog URL
          <input
            type="text"
            name="Blog URL"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )}
export default BlogForm