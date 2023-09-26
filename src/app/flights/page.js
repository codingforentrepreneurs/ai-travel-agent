"use client" // make for frontend only

import Link from '@/app/utils/link'
import performAPIGetRequest from '@/app/utils/apiClient'

export default function FlightListPage() {
  const { data, error, isLoading } = performAPIGetRequest("/flights")
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  const myVar = "word"

  const renderListData = (row, idx) => {
    const flightRowLink = `/flights/${row.id}`
    return <div key={`flight-data-${idx}`}>
        <p>
          <Link href={flightRowLink}>{row.flightDate}</Link>
        </p>
        <p>
          {row.startingAirport}
        </p>
        <p> 
          {row.destinationAirport}
        </p>
        <p>
          {row.totalFare}
        </p>
    </div>
  }
  return ( // jsx
    <div>
      <h1>hello {myVar}</h1>
      {data && data.map(renderListData)}
    </div>
  )
}
