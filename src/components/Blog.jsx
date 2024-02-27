import { useState } from 'react'
import blogService from '../services/blogs'
import '../styles/styles.css'

const Blog = ({ blog, blogs, user, setBlogs, setInfoMessage, setErrorMessage }) => {
  const [visible, setVisible] = useState(false)
  const deleteBlog = async (e,id) => {
    e.preventDefault();
    console.log("User :" + JSON.stringify(user))
    console.log("Id :" + id)
    try {
      await blogService.deleteBlog(id, user)
      setBlogs(blogs.filter(blog => blog.id!== id))
      setInfoMessage('Blog "' + blog.title + '" is deleted successfully')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong blog id')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const editBlog = async (e, blog) => {

  }
  const showAll = (e) => {
    e.preventDefault();
    setVisible(!visible)
  }
  const increaseLikes = async (e) => {
    e.preventDefault();
    console.log("Blogbefore" + JSON.stringify(blog))
    const likesincreased = {
      title: blog.title,
      author: blog.author,
      user: blog.user,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    }
    console.log("Blogafter" + JSON.stringify(likesincreased))
    try {
      await blogService.updateBlog(likesincreased, user)
      setBlogs(blogs.map(blog => blog.id === likesincreased.id? likesincreased : blog))
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const showLess = { display: visible ? 'none' : '' }
  const showMore = { display: visible ? '' : 'none' }
  return (
    <div className='blog'>
      <div style={showLess}>
        {blog.title}
        <button onClick={(e) => showAll(e)}>view</button>
      </div>
      <div style={showMore}>
        <div>
          {blog.title}
          <button onClick={(e) => showAll(e)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes: {blog.likes}
        <button onClick={(e)=> increaseLikes(e)}>like</button>
        </div>
        <div>{blog.author}</div>
      </div> 
        <button onClick={(e) => editBlog(e, blog)}>Edit Blog</button>
        <button onClick={(e) => deleteBlog(e, blog.id)}>Delete Blog</button>
    </div>  
  )
}
export default Blog