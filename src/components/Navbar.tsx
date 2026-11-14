import { NavLink } from 'react-router-dom'
function Navbar() {
    return (
        <div>
            <nav>
                <h2>User Dashboard</h2>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </nav>
        </div>
    )
}
export default Navbar
