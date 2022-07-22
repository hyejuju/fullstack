import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only correct contents', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test author',
    likes: 12,
    url: 'test.com'
  }
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blogShort')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'test author'
  )
  expect(div).not.toHaveTextContent(
    'test.com'
  ) 
  expect(div).not.toHaveTextContent(
    12
  )
})

test('expand the blog and show correct components', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'test author',
      likes: 12,
      url: 'test.com'
    }
   
    const { container } = render(<Blog blog={blog}/>)
  
    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)

    const div = container.querySelector('.blogLong')
  
    expect(div).toHaveTextContent(
        'test.com'
    )
    expect(div).toHaveTextContent(
        12
    )
})

test('expand the blog and show correct components', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'test author',
      likes: 12,
      url: 'test.com'
    }

    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

    const viewButton = screen.getByText('view')
    
    const user = userEvent.setup()
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
    
})