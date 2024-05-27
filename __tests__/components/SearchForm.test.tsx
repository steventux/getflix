import { expect, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchForm from '@/app/components/SearchForm'

function searchResponse() {
  return { 
    data: [
      { 
        name: 'Apocalypse Now',
        magnet: 'magnet:?xt=urn:sha1:YNCKHTQCWBTRNJIV4WNAE52SJUQCZO5C&dn=some+file.txt',
        seeders: 125,
        size: '1.7GB',
        category: 'Movie'
      }
    ] 
  } 
}

global.fetch = vi.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => {
      return Promise.resolve(searchResponse());
    },
  })
)

test('SearchForm search', async () => {
  render(<SearchForm />)

  const searchBox = screen.getByPlaceholderText('The Shining')
  const button = screen.getByRole('button', { name: 'Search' })

  expect(searchBox).toBeDefined()
  expect(button).toBeDefined()
  expect(screen.getByRole('link', { name: 'Deluge' })).toBeDefined()

  fireEvent.click(button)

  expect(screen.getByText(/Enter something/i)).toBeDefined()

  fireEvent.change(searchBox, { target: { value: 'Apocalypse Now' } })

  fireEvent.click(button)

  expect(screen.getByRole('img', { name: 'Loading...' })).toBeDefined()
  expect(screen.queryByText('Search')).toBeNull()
  expect(screen.findByRole('list')).toBeDefined()

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(screen.findByRole('link', { name: 'Apocalypse Now' })).toBeDefined()
})
