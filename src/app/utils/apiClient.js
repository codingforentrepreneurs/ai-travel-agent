"use client" // make for frontend only

import useSWR from 'swr'

const API_BASE_URL = "http://localhost:8080"
const fetcher = (...args) => fetch(...args).then(res => res.json())

// "flight"
// "/flight"
// "/flights/"

export default function performAPIGetRequest(path) {
    const endpoint = path.startsWith("/") ? path.slice(1, ) : path
    const url = `${API_BASE_URL}/${endpoint}`
    const swrData = useSWR(url, fetcher)
  return swrData
}