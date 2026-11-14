import { memo } from 'react'
function Filtering({ city, setCity, company, setCompany }: {
    city: string,
    setCity: (value: string) => void,
    company: string,
    setCompany: (value: string) => void
}) {
    return (
        <div className="filter-fields">
            <input
                type="text"
                placeholder="Search by city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="text"
                placeholder="Search by company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
        </div>
    )
}
export default memo(Filtering)
