import { useState } from 'react'
import loginService from '../services/login'
const LoginForm = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const loginUser = await loginService.login({
        username, password,
      })
      props.setUser(loginUser)
      window.localStorage.setItem('user', JSON.stringify(loginUser))
      setUsername('')
      setPassword('')
      props.setInfoMessage('Hello ' + loginUser.name)
      setTimeout(() => {
        props.setInfoMessage(null)
      }, 5000)
    } catch (e) {
      console.log(e)
      props.setErrorMessage('Login failed: ' + e.response.data.error)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLoginSubmit}>
        <div>
           username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
           password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm