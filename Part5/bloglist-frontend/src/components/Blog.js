import React, { useState } from 'react'

const Blog = ({blog, handleLike, handleRemove}) => {
const [blogVisible, setBlogVisible] = useState(false)

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

if(blogVisible){
  return (
    <div className='blogLong' style={blogStyle}>
      {blog.title} <button onClick={() => setBlogVisible(false)}>hide</button><br />
      {blog.url} <br />
      {blog.likes}<button id='like-button' onClick={() => handleLike(blog.id, blog.likes)}>like</button><br />
      {blog.author}<br />
      <button id='remove-button' onClick={() => handleRemove(blog)}>remove</button>
      
    </div>
  ) 
}
else{
  return(
    <div className='blogShort'>
      {blog.title} {blog.author}
      <button onClick={() => setBlogVisible(true)}>view</button>
    </div> 
    ) 
}

}

export default Blog