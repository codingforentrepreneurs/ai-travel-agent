"use client" // make for frontend only

import useSWR from 'swr'

export const API_BASE_URL = "http://localhost:8080"

const fetcher = async url => {
  const res = await fetch(url)
 
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.statusCode = res.status
    throw error
  }
 
  return res.json()
}

// "flight"
// "/flight"
// "/flights/"

export default function performAPIGetRequest(path) {
    const endpoint = path.startsWith("/") ? path.slice(1, ) : path
    const url = `${API_BASE_URL}/${endpoint}`
    const swrData = useSWR(url, fetcher)
  return swrData
}