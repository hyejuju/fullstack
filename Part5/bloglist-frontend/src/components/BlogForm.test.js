import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('form calls the event handler it received as props', async () => {
    
    const mockHandler = jest.fn()
    render(<BlogForm createBlog={mockHandler}/>)
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    await user.type(titleInput, 'some title')

    const authorInput = screen.getByPlaceholderText('author')
    await user.type(authorInput, 'some author')

    const urlInput = screen.getByPlaceholderText('url')
    await user.type(urlInput, 'some url')

    const likesInput = screen.getByPlaceholderText('likes')
    await user.type(likesInput, '1')

    const createButton = screen.getByText('Create')
    await user.click(createButton)

    expect(mockHandler.mock.calls[0][0].title).toBe('some title')
    expect(mockHandler.mock.calls[0][0].author).toBe('some author')
    expect(mockHandler.mock.calls[0][0].url).toBe('some url')
    expect(mockHandler.mock.calls[0][0].likes).toBe('1')
})