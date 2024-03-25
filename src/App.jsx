import { useState, useEffect, StrictMode } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import './styles/styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState()
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogList => {
      //sort by most likes
      setBlogs(blogList.toSorted((a, b) => b.likes - a.likes))
    })
  }, [])
  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if(storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  console.log(blogs)

  const handleLogout = (e) => {
    e.preventDefault()
    try {
      setInfoMessage('Have a nice day !')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
      window.localStorage.removeItem('user')
      setLoginVisible(false)
      setUser(null)
    } catch (exception) {
      setErrorMessage(exception.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const increaseLikesOf = async (e, blog) => {
    e.preventDefault()
    console.log('Blogbefore' + JSON.stringify(blog))
    console.log('User ' + JSON.stringify(user))
    const likesincreased = { ...blog, likes: blog.likes+1 }
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
  const addNewBlog = async ( blogi) => {
    const newBlog = {...blogi, author: user.name}
    
    try {
      const blog = await blogService.addNewBlog(newBlog, user)
      console.log(blog)
      setBlogs([...blogs, blog])
      setInfoMessage('New blog "' + blog.title + '" is added')
      setBlogFormVisible(false)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <StrictMode>
      <div>
        <Notification error={errorMessage} info={infoMessage} />
        {!user &&
        <Togglable buttonLabel='login' visibility={loginVisible} setVisibility={setLoginVisible} >
          <LoginForm
            user={user}
            setUser={setUser}
            setInfoMessage={setInfoMessage}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
        }
        {user &&
        <div key={user.name}>
          <div>{user.name} is logged in
            <button type="logout" onClick={handleLogout} >logout</button>
          </div>
          <Togglable buttonLabel='add new blog' visibility={blogFormVisible} setVisibility={setBlogFormVisible}>
            <BlogForm
            //handleTitleChange={({ target }) => setTitle(target.value)}
            //handleAuthorChange={({ target }) => setAuthor(target.value)}
            //handleUrlChange={({ target }) => setBlogUrl(target.value)}
              addNewBlog={addNewBlog}
            />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <form key={blog.id}>
              <Blog key={blog.id} blog={blog} blogs={blogs} user={user} setBlogs={setBlogs} setInfoMessage={setInfoMessage} setErrorMessage={setErrorMessage} increaseLikes={(e) => increaseLikesOf(e, blog)}/>
            </form>
          )}
        </div>
        }
      </div>
    </StrictMode>
  )
}

export default App