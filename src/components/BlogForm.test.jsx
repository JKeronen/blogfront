import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const addNewBlog = vi.fn()

  render(<BlogForm addNewBlog={addNewBlog} />)

  const input = screen.getByRole('titlearea')
  const input2 = screen.getByRole('urlarea')
  const sendButton = screen.getByText('add')
  await user.type(input, 'testing a form...')
  await user.type(input2, 'http....')
  await user.click(sendButton)
  expect(addNewBlog.mock.calls).toHaveLength(1)
  expect(addNewBlog.mock.calls[0][0].title).toContain('testing a form...')
  expect(addNewBlog.mock.calls[0][0].url).toContain('http....')
})