import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogList => {
      setBlogs(blogList)
    })  
  }, [])
  console.log(blogs)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await loginService.login({
        username, password,
      })
      setUser(loginUser);
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
  }
  const addNewBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: user.username,
      url: blogUrl,
    }
    try {
      const blog = await blogService.addNewBlog(newBlog, user)
      console.log(blog)
      setBlogs([...blogs, blog])
      setTitle('')
      setBlogUrl('')
    } catch (exception) {
      setErrorMessage('wrong blog url')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const deleteBlog = async (e,id) => {
    e.preventDefault();
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
  )

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
      {user &&
      <div>
        <h2>Blogs</h2>
        {user.name } logged in
        {blogs.map(blog =>
        <form>
          <Blog key={blog.id} blog={blog} />
          <button onClick={() => deleteBlog(blog.id)}>Delete Blog</button>
        </form>
        )}
      </div>
      }
    </div>
  )
}

export default App