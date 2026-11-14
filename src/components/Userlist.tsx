import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import Sorting from './Sorting'
import Filtering from './Filtering'
import Pagination from './Pagination'
import useDebounce from './useDebounce'
function Userlist() {
    const navigate = useNavigate()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [order, setOrder] = useState("asc")
    const [city, setCity] = useState("")
    const [company, setCompany] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [retry, setRetry] = useState(0)
    const usersPerPage = 5
    // Debouncing
    const debouncedSearch = useDebounce(search, 400)
    const debouncedCity = useDebounce(city, 400)
    const debouncedCompany = useDebounce(company, 400)
    // Fetch users
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users")
                if (!response.ok) {
                    throw new Error("Failed to fetch users")
                }
                const data = await response.json()
                setUsers(data)
                setLoading(false)
                setError("")
            }
            catch {
                setError("Failed to fetch users")
                setLoading(false)
            }
        }
        fetchUsers()
    }, [retry])
    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch, debouncedCity, debouncedCompany])
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            (
                user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                user.username.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
            ) &&
            user.address.city.toLowerCase().includes(debouncedCity.toLowerCase()) &&
            user.company.name.toLowerCase().includes(debouncedCompany.toLowerCase())
        )
    }, [users, debouncedSearch, debouncedCity, debouncedCompany])
    const sortedUsers = useMemo(() => {
        const result = [...filteredUsers]
        if (sortBy !== "") {
            result.sort((a, b) => {
                if (order === "asc") {
                    return a[sortBy].localeCompare(b[sortBy])
                }
                else {
                    return b[sortBy].localeCompare(a[sortBy])
                }

            })
        }
        return result
    }, [filteredUsers, sortBy, order])
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage)
    const currentUsers = useMemo(() => {
        const lastIndex = currentPage * usersPerPage
        const firstIndex = lastIndex - usersPerPage
        return sortedUsers.slice(firstIndex, lastIndex)
    }, [sortedUsers, currentPage])
    const handleSearch = useCallback((value: string) => {
        setSearch(value)
    }, [])
    const handleCity = useCallback((value: string) => {
        setCity(value)
    }, [])
    const handleCompany = useCallback((value: string) => {
        setCompany(value)
    }, [])
    const handleSortBy = useCallback((value: string) => {
        setSortBy(value)
    }, [])
    const handleOrder = useCallback((value: string) => {
        setOrder(value)
    }, [])
    const handlePage = useCallback((value: number) => {
        setCurrentPage(value)
    }, [])
    const handleRetry = useCallback(() => {
        setError("")
        setLoading(true)
        setRetry((previousRetry) => previousRetry + 1)
    }, [])
    if (loading) {
        return <h2>Loading Users...</h2>
    }
    if (error) {
        return (
            <div>
                <button onClick={() => navigate('/')}>
                    Back to Home
                </button>

                <h2>{error}</h2>

                <button onClick={handleRetry}>
                    Try Again
                </button>
            </div>
        )
    }
    return (
        <div className="user-list-container">
            <button onClick={() => navigate('/')}>
                Back to Home
            </button>
            <h2>Users List</h2>
            <div className="search-fields">
            <SearchBar
                search={search}
                setSearch={handleSearch}
            />
            <Filtering
                city={city}
                setCity={handleCity}
                company={company}
                setCompany={handleCompany}
            />
            </div>
            <div className="sorting-fields">
            <Sorting
                sortBy={sortBy}
                setSortBy={handleSortBy}
                order={order}
                setOrder={handleOrder}
            />
            </div>
            <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>{user.company.name}</td>
                                <td>{user.address.city}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            {sortedUsers.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={handlePage}
                    totalPages={totalPages}
                />
            )}
        </div>
    )
}
export default Userlist
