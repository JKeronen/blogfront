import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './styles/styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogList => {
      setBlogs(blogList)
    })  
  }, [])
  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if(storedUser) {
      setUser(JSON.parse(storedUser))
    }  
  }, [])
  console.log(blogs)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await loginService.login({
        username, password,
      })
      setUser(loginUser);
      window.localStorage.setItem('user', JSON.stringify(loginUser))
      setUsername('')
      setPassword('')
      setInfoMessage('Hello ' + loginUser.name)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (e) {
      console.log(e)
      setErrorMessage("Login failed: " + e.response.data.error)
      setTimeout(() => {
        setErrorMessage(null) 
      }, 5000)
    } 
  }
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      setInfoMessage('Have a nice day !')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
      window.localStorage.removeItem('user')
      
      setUser(null)
    } catch (exception) {
      setErrorMessage(exception.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
  }
  const addNewBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: user.name,
      url: blogUrl,
    }
    try {
      const blog = await blogService.addNewBlog(newBlog, user)
      console.log(blog)
      setBlogs([...blogs, blog])
      setTitle('')
      setAuthor('')
      setBlogUrl('')
      setInfoMessage('New blog "' + blog.title + '" is added')
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
  

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>  
    </div>
  )
  const blogForm = () => (
    <div>
      <div>{user.name} is logged in 
      <button type="logout" onClick={handleLogout} >logout</button>
    </div>
    <h2>Add new blog</h2>
    <form onSubmit={addNewBlog}>
      <div>
        Title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
         Blog URL
        <input
          type="text"
          value={blogUrl}
          name="Blog URL"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>  
    </div>
  )

  return (
    <div>
      <Notification error={errorMessage} info={infoMessage} />
      {!user && loginForm()}
      {user && blogForm()}
      {user &&
      <div>
        
        <h2>Blogs</h2>
        {blogs.map(blog =>
        <form>
          <Blog key={blog.id} blog={blog} blogs={blogs} user={user} setBlogs={setBlogs} setInfoMessage={setInfoMessage} setErrorMessage={setErrorMessage} />  
        </form>
        )}
      </div>
      }
    </div>
  )
}

export default App