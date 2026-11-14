import { memo } from 'react'
function Sorting({ sortBy, setSortBy, order, setOrder }: {
    sortBy: string,
    setSortBy: (value: string) => void,
    order: string,
    setOrder: (value: string) => void
}) {
    return (
        <div>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="username">Username</option>
                <option value="email">Email</option>
            </select>

            <button onClick={() => setOrder("asc")}>
                Ascending ↑
            </button>

            <button onClick={() => setOrder("desc")}>
                Descending ↓
            </button>
        </div>
    )
}
export default memo(Sorting)