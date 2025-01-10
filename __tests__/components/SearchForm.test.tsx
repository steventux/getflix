import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import {cleanup, fireEvent, render, screen } from '@testing-library/react'
import SearchForm from '@/app/components/SearchForm'
import Result from '@/app/types/result'
import { addTorrent, getTorrents, startSearch, searchResults, clearSearch } from '@/app/lib/qbittorrent'

const searchResults: Result[] = [
  {
    fileName: 'Apocalypse Now',
    fileUrl: 'magnet:?xt=urn:sha1:YNCKHTQCWBTRNJIV4WNAE52SJUQCZO5C&dn=some+file.txt',
    hash: 'ynckhtqcwbtrnjiv4wnae52sjuqczo5c',
    nbSeeders: 125,
    fileSize: 1825361101,
  },
  {
    fileName: 'Apocalypse Nowadays',
    fileUrl: 'magnet:?xt=urn:sha1:AQCKHTQCWBTRNJIV4WNAE52SJUQCZO5C&dn=some+other+file.txt',
    hash: 'aqckhtqcwbtrnjiv4wnae52sjuqczo5c',
    nbSeeders: 2,
    fileSize: 3972844749,
  }
]

const startSearchResponse = vi.fn()
const searchResultsResponse = vi.fn()
const getTorrentsResponse = vi.fn()

vi.mock('@/app/lib/qbittorrent', () => {
  return {
    addTorrent: vi.fn(),
    getTorrents: vi.fn(() => Promise.resolve(getTorrentsResponse())),
    startSearch: vi.fn(() => Promise.resolve(startSearchResponse())),
    searchResults: vi.fn(() => Promise.resolve(searchResultsResponse())),
    clearSearch: vi.fn(),
  }
})

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  render(<SearchForm />)
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

test('SearchForm renders', () => {
  const searchBox = screen.getByPlaceholderText('The Shining')
  const button = screen.getByRole('button', { name: 'Search' })
  expect(searchBox).toBeDefined()
  expect(button).toBeDefined()
})

test('SearchForm notifies when no query is entered', () => {
  const button = screen.getByRole('button', { name: 'Search' })
  fireEvent.click(button)

  expect(screen.getByText(/Enter something/i)).toBeDefined()
})

test('SearchForm search results are rendered', async () => {
  startSearchResponse.mockReturnValue(2)
  searchResultsResponse.mockReturnValue(searchResults)

  const searchBox = screen.getByPlaceholderText('The Shining')
  const button = screen.getByRole('button', { name: 'Search' })
  
  fireEvent.change(searchBox, { target: { value: 'Apocalypse Now' } })
  fireEvent.click(button)

  await vi.advanceTimersByTimeAsync(5000)

  expect(screen.getByRole('button', { name: 'Search' })).toBeDefined()

  expect(screen.findByRole('list')).toBeDefined()
  expect(screen.findByRole('link', { name: 'Apocalypse Now' })).toBeDefined()
  expect(screen.findByRole('link', { name: 'Apocalypse Nowadays' })).toBeDefined()

  fireEvent.click(screen.getByRole('link', { name: 'Apocalypse Now' }))
  expect(addTorrent).toHaveBeenCalledTimes(1)
  expect(addTorrent).toHaveBeenCalledWith(searchResults[0].fileUrl)
  expect(screen.getByText(/Apocalypse Now added to queue/i)).toBeDefined()
  expect(screen.queryByText('Apocalypse Now')).toBeNull()
  expect(screen.findByRole('link', { name: 'Apocalypse Nowadays' })).toBeDefined()
})

test('SearchForm notifies of no results', async () => {
  startSearchResponse.mockReturnValue(5)
  const searchBox = screen.getByPlaceholderText('The Shining')
  const button = screen.getByRole('button', { name: 'Search' })
  searchResultsResponse.mockReturnValue([])

  fireEvent.change(searchBox, { target: { value: 'Some obscure film' } })
  fireEvent.click(button)

  await vi.advanceTimersByTime(5000)

  expect(screen.findByText(/No results found/i)).toBeDefined()
})

test('SearchForm renders queue', async () => {
  getTorrentsResponse.mockReturnValue(JSON.stringify([{ fileName: 'Jaws', progress: '0.33999', state: 'downloading' }]))

  expect(getTorrents).toHaveBeenCalledTimes(1)
  expect(screen.findByText(/Jaws 34%/i)).toBeDefined()
});
