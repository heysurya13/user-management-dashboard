import { useNavigate } from 'react-router-dom'
import Welcome from './Welcome'
function Home() {
    const navigate = useNavigate()
    return (
        <div className="hero-page">
            <Welcome />
            <button onClick={() => navigate('/users')}>
                👤User Details
            </button>
        </div>
    )
}
export default Home
