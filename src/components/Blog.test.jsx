import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'
import { exact } from 'prop-types'
import { beforeAll, vi } from 'vitest'
beforeAll(() => {
  

  })
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'http://react-testing-library.com',
    likes: 5,
    author: 'Test Program',
    id: 12345,
  }
  const user = {
    name: 'Test Program',
  }

test('renders content', () => {
  

  render(<Blog blog={blog} user={user} />)

  const element = screen.getAllByText('Component testing is done with react-testing-library', {exact: false} )
  expect(element).toBeDefined()
  expect(element).toHaveLength(2)
})
test('renders content when button pressed', async () => {
  

  render(<Blog blog={blog} user={user} />)

  const juser = userEvent.setup();
  const button = screen.getByText('view')
  await juser.click(button)

  const displayedUrl = screen.getAllByText(blog.url, {exact: false});
  const displayedLikes = screen.getAllByText(blog.likes.toString(), {exact: false});
  const displayedUser = screen.getAllByText(blog.author, {exact: false});

  expect(displayedUrl).toBeDefined()
  expect(displayedLikes).toBeDefined()
  expect(displayedUser).toBeDefined()
})
test('Likes-button pressed twice calls handler twice', async () => {

  const mockHandler = vi.fn()
  render(<Blog blog={blog} user={user}  increaseLikes={mockHandler}/>)

  const juser = userEvent.setup()
  const button = screen.getByText('like')
  await juser.click(button)
  await juser.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
