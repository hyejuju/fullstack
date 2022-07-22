import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000) 
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

    const addBlog = async (blogObject) => {
      try {
        blogFormRef.current.toggleVisibility()
        const createdBlog = await blogService
          .create(blogObject)
        setBlogs(blogs.concat(createdBlog))
        setNotificationMessage(
          `New blog ${blogObject.title} added`
        )    
       
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } catch(exception) {
        setNotificationMessage(
          `Cannot add blog ${blogObject.title}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    }

    const handleLike = async (id, likes) =>{
      await blogService.update({
        id: id,
        likes: likes + 1,
      })
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      
        const blogs = await blogService.getAll()
    setBlogs(blogs)
    }

    const handleRemove = async (blog) => {
      if (window.confirm("Do you really want to?")) {
      await blogService.remove(blog) 
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationMessage(` Removed blog ${blog.title}`)
      }, 5000)
    }
    }

    const toggleVisibility = () => {
      setBlogFormVisible(!blogFormVisible)
    }



  const loginForm = () => (
  
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>    
 
  )

  

  return (
    <div>
      <Notification message={notificationMessage} />
    <h2>blogs</h2>

      {user === null ?
        loginForm() :
        <div>
          
          
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog"  ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
          </Togglable>
          
          {blogs.sort((a,b) => (a.likes > b.likes ? -1 : 1)).map(blog =><Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>)}
          </div>
      }
    </div>
  )
}

export default App
