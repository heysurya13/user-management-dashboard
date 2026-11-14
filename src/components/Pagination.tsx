import { memo } from 'react'
function Pagination({ currentPage, setCurrentPage, totalPages }: {
    currentPage: number,
    setCurrentPage: (value: number) => void,
    totalPages: number
}) {
    return (
        <div>
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}
export default memo(Pagination)