
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import SearchBar from '../components/SearchBar'

function SearchBarTest() {

    const [search, setSearch] = useState("")

    return (
        <SearchBar
            search={search}
            setSearch={setSearch}
        />
    )
}

test('SearchBar displays the input field', () => {

    render(<SearchBarTest />)

    const input = screen.getByPlaceholderText(
        'Search by name, username or email'
    )

    expect(input).toBeInTheDocument()
})

test('SearchBar accepts user input', async () => {

    const user = userEvent.setup()

    render(<SearchBarTest />)

    const input = screen.getByPlaceholderText(
        'Search by name, username or email'
    )

    await user.type(input, 'Surya')

    expect(input).toHaveValue('Surya')
})
