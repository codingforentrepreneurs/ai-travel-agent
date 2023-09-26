"use client" 

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function FlightDetailPage ({params}) {
    const {id} = params
    const url = `http://localhost:8080/flights/${id}`
    const { data, error, isLoading } = useSWR(url, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return <div>{JSON.stringify(data)}</div>
}