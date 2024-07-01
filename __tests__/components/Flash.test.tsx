import { beforeAll, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Flash from '@/app/components/Flash'

let flash = {
  type: 'success',
  message: 'Success!'
}

beforeAll(() => {
  render(<Flash flash={flash}/>)
})

test('Flash renders', () => {
  expect(screen.getByText('Success!')).toBeDefined()
})
