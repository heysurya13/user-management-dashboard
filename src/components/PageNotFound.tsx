import { useNavigate } from 'react-router-dom'
function PageNotFound() {
    const navigate = useNavigate()
    return (
        <div className="error-page">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    )
}
export default PageNotFound
