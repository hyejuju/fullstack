import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
      likes,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="title"
            value={title}
            name="title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            value={author}
            name="author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            value={url}
            name="url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes
          <input
            id="likes"
            value={likes}
            name="likes"
            placeholder="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm