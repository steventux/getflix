import { beforeAll, expect, test, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchForm from '@/app/components/SearchForm'
import { addTorrent } from '@/app/lib/deluge'

const searchResults = [
  {
    name: 'Apocalypse Now',
    magnet: 'magnet:?xt=urn:sha1:YNCKHTQCWBTRNJIV4WNAE52SJUQCZO5C&dn=some+file.txt',
    seeders: 125,
    size: '1.7GB',
    category: 'Movie'
  },
  {
    name: 'Apocalypse Nowadays',
    magnet: 'magnet:?xt=urn:sha1:AQCKHTQCWBTRNJIV4WNAE52SJUQCZO5C&dn=some+other+file.txt',
    seeders: 2,
    size: '3.5GB',
    category: 'Movie'
  }
]

const status = vi.fn()
const searchResponse = vi.fn()

global.fetch = vi.fn(() =>
  Promise.resolve({
    status: status(),
    json: () => {
      return Promise.resolve(searchResponse());
    },
  })
)

vi.mock('@/app/lib/deluge', () => {
  return {
    addTorrent: vi.fn(),
  }
})

beforeAll(() => {
  render(<SearchForm />)
})

test('SearchForm renders', () => {
  const searchBox = screen.getByPlaceholderText('The Shining')
  const button = screen.getByRole('button', { name: 'Search' })
  expect(searchBox).toBeDefined()
  expect(button).toBeDefined()
  expect(screen.getByRole('link', { name: 'Deluge' })).toBeDefined()
})

test('SearchForm notifies when no query is entered', () => {
  const button = screen.getByRole('button', { name: 'Search' })
  fireEvent.click(button)

  expect(screen.getByText(/Enter something/i)).toBeDefined()
})

test('SearchForm search results are rendered', async () => {
  const searchBox = screen.getByPlaceholderText('The Shining')
  const button = screen.getByRole('button', { name: 'Search' })
  status.mockReturnValue(200)
  searchResponse.mockReturnValue({ data: searchResults})

  fireEvent.change(searchBox, { target: { value: 'Apocalypse Now' } })
  fireEvent.click(button)

  expect(screen.getByRole('img', { name: 'Loading...' })).toBeDefined()
  expect(screen.queryByText('Search')).toBeNull()
  expect(screen.findByRole('list')).toBeDefined()

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(screen.findByRole('link', { name: 'Apocalypse Now' })).toBeDefined()
  expect(screen.findByRole('link', { name: 'Apocalypse Nowadays' })).toBeDefined()

  fireEvent.click(await screen.findByRole('link', { name: 'Apocalypse Now' }))
  expect(addTorrent).toHaveBeenCalledTimes(1)
  expect(addTorrent).toHaveBeenCalledWith(searchResults[0].magnet)
  expect(screen.queryByText('Apocalypse Now')).toBeNull()
  expect(screen.findByRole('link', { name: 'Apocalypse Nowadays' })).toBeDefined()
})

test('SearchForm notifies of no results', async () => {
  const searchBox = screen.getByPlaceholderText('The Shining')
  const button = screen.getByRole('button', { name: 'Search' })
  status.mockReturnValue(404)
  searchResponse.mockReturnValue({ error: 'Result Not Found' })

  fireEvent.change(searchBox, { target: { value: 'Some obscure film' } })
  fireEvent.click(button)

  expect(screen.findByText(/No results found/i)).toBeDefined()
})
