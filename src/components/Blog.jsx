import { useState } from 'react'
import blogService from '../services/blogs'
import '../styles/styles.css'

const Blog = ({ blog, blogs, user, setBlogs, setInfoMessage, setErrorMessage }) => {
  const [visible, setVisible] = useState(false)
  const deleteBlog = async (e,id) => {
    e.preventDefault()
    console.log('User :' + JSON.stringify(user))
    console.log('Id :' + id)
    if (window.confirm('Do you really want to remove blog?')) {
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
      }}
  }
  const showAll = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }
  const increaseLikes = async (e) => {
    e.preventDefault()
    console.log('Blogbefore' + JSON.stringify(blog))
    console.log('User ' + JSON.stringify(user))
    const likesincreased = {
      title: blog.title,
      author: blog.author,
      user: blog.user,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    }
    console.log('BlogUpdated' + JSON.stringify(likesincreased))
    try {
      await blogService.updateBlog(likesincreased, user)
      const updatedBlogs = blogs.map(blog => blog.id === likesincreased.id? likesincreased : blog)
      //sort by most likes
      setBlogs(updatedBlogs.toSorted((a, b) => b.likes - a.likes))
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
        Title: {blog.title}
        <button onClick={(e) => showAll(e)}>view</button>
      </div>
      <div style={showMore}>
        <div>
          Title: {blog.title}
          <button onClick={(e) => showAll(e)}>hide</button>
        </div>
        <div>
          Url: {blog.url}
        </div>
        <div>Likes: {blog.likes}
          <button onClick={(e) => increaseLikes(e)}>like</button>
        </div>
        <div>
          Author: {blog.author}
        </div>
        {(blog.author === user.name)&&
          <button onClick={(e) => deleteBlog(e, blog.id)}>Delete Blog</button>
        }
      </div>
    </div>
  )
}
export default Blog