import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
function UserDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch user details")
                }
                const data = await response.json()
                setUser(data)
                setLoading(false)
            }
            catch {
                setError("Failed to fetch user details")
                setLoading(false)
            }
        }
        fetchUser()
    }, [id])
    if (loading) {
        return <h2>Loading User Details...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }
    if (!user || !user.id) {
        return <h2>User Not Found</h2>
    }
    return (
        <div className="profile-page">
            <button onClick={() => navigate('/users')}>
                Back to User List
            </button>
            <div className="profile-container">
                <h2>User Profile</h2>
                <div className="profile-header">
                    <div className="empty-avatar"></div>
                    <div className="profile-basic-info">
                        <h2>{user.name}</h2>
                        <h3>Basic Information</h3>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Website: {user.website}</p>
                    </div>
                </div>
                <div className="profile-details">
                    <div className="profile-section">
                        <h3>Address Information</h3>
                        <p>Street: {user.address.street}</p>
                        <p>Suite: {user.address.suite}</p>
                        <p>City: {user.address.city}</p>
                        <p>Zipcode: {user.address.zipcode}</p>
                        <p>Latitude: {user.address.geo.lat}</p>
                        <p>Longitude: {user.address.geo.lng}</p>
                    </div>
                    <div className="profile-section">
                        <h3>Company Information</h3>
                        <p>Company Name: {user.company.name}</p>
                        <p>Catch Phrase: {user.company.catchPhrase}</p>
                        <p>Business: {user.company.bs}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserDetail
