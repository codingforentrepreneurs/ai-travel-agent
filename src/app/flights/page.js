"use client" // make for frontend only

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function FlightListPage() {
  const url = "http://localhost:8080/flights"
  const { data, error, isLoading } = useSWR(url, fetcher)
  const mainClassCSS ="flex min-h-screen flex-col items-center justify-between p-24"
  const linkCSS = "text-emerald-500 hover:text-emerald-900 dark:text-gray-400 dark:hover:text-gray-900"
  if (error) return <div className={mainClassCSS}>failed to load</div>
  if (isLoading) return <div className={mainClassCSS}>loading...</div>
  const myVar = "word"

  const renderListData = (row, idx) => {
    const flightRowLink = `/flights/${row.id}`
    return <div key={`flight-data-${idx}`}>
        <p>
          <a className={linkCSS} href={flightRowLink}>{row.flightDate}</a>
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
    <main className={mainClassCSS}>
      <h1>hello {myVar}</h1>
      {data && data.map(renderListData)}
    </main>
  )
}
