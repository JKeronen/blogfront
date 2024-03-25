import { useState } from 'react'
const BlogForm = ({addNewBlog}) => {
  
  const [title, setTitle] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    addNewBlog({
      title: title, 
      url: blogUrl
    })
  }
  
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div >
        Title
          <input
            role='titlearea'
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div >
         Blog URL
          <input
            role='urlarea'
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