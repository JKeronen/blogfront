import { useState } from 'react'
import blogService from '../services/blogs'
import '../styles/styles.css'

const Blog = ({ blog, blogs, user, setBlogs, setInfoMessage, setErrorMessage, increaseLikes }) => {
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
        }, 1000)
      } catch (exception) {
        setErrorMessage('wrong blog id')
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      }}
  }
  const showAll = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }
  
  const showLess = { display: visible ? 'none' : '' }
  const showMore = { display: visible ? '' : 'none' }
  return (
    <div className='blog'>
      <div id='showLess' style={showLess}>
        <h3>Title: {blog.title}</h3>
        <button onClick={(e) => showAll(e)}>view</button>
      </div>
      <div id='showMore' style={showMore}>
        <div>
          <h3>Title: {blog.title}</h3>
          <button onClick={(e) => showAll(e)}>hide</button>
        </div>
        <div>
          Url: {blog.url}
        </div>
        <div>Likes: {blog.likes}
          <button onClick={increaseLikes}>like</button>
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