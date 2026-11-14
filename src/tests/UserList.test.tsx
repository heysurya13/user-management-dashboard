
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Userlist from '../components/Userlist'

test('UserList displays users when API fetch is successful', async () => {
    window.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => [
            {
                id: 1,
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'leanne@example.com',
                phone: '123456789',
                website: 'example.com',
                address: {
                    city: 'Gwenborough'
                },
                company: {
                    name: 'Romaguera-Crona'
                }
            }
        ]
    }) as unknown as typeof fetch

    render(
        <MemoryRouter>
            <Userlist />
        </MemoryRouter>
    )

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument()
    expect(screen.getByText('Gwenborough')).toBeInTheDocument()
})

test('UserList displays an error when API fetch fails', async () => {
    window.fetch = jest.fn().mockResolvedValue({
        ok: false
    }) as unknown as typeof fetch

    render(
        <MemoryRouter>
            <Userlist />
        </MemoryRouter>
    )

    expect(
        await screen.findByText('Failed to fetch users')
    ).toBeInTheDocument()

    expect(screen.getByText('Try Again')).toBeInTheDocument()
})
