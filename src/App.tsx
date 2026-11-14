import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './components/Homepage'
import UserList from './components/Userlist'
import PageNotFound from './components/PageNotFound'
const UserDetail = lazy(() => import('./components/UserDetail'))
function App() {
    return (
        <Suspense fallback={<h2>Loading Page...</h2>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    )
}
export default App
