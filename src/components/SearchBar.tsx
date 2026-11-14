import { memo } from 'react'
function SearchBar({ search, setSearch }: {
    search: string,
    setSearch: (value: string) => void
}) {
    return (
        <div>
            <input
                type="text"
                placeholder="Search by name, username or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}
export default memo(SearchBar)