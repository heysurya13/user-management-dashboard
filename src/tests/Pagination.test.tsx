import { test, expect } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import Pagination from '../components/Pagination'

function PaginationTest() {

    const [currentPage, setCurrentPage] = useState(1)

    return (
        <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={3}
        />
    )
}

test('Pagination displays the current page', () => {

    render(<PaginationTest />)

    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument()
})

test('Next button moves to the next page', async () => {

    const user = userEvent.setup()

    render(<PaginationTest />)

    await user.click(screen.getByText('Next'))

    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument()
})

test('Previous button moves to the previous page', async () => {

    const user = userEvent.setup()

    render(<PaginationTest />)

    await user.click(screen.getByText('Next'))
    await user.click(screen.getByText('Previous'))

    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument()
})

test('Previous button is disabled on first page', () => {

    render(<PaginationTest />)

    expect(screen.getByText('Previous')).toBeDisabled()
})
