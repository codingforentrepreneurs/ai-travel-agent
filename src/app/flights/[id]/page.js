"use client" 

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function FlightDetailPage ({params}) {
    const {id} = params
    const url = `http://localhost:8080/flights/${id}`
    const { data, error, isLoading } = useSWR(url, fetcher)
    const mainClassCSS ="flex min-h-screen flex-col items-center justify-between p-24"
    if (error) return <div className={mainClassCSS}>failed to load</div>
    if (isLoading) return <div className={mainClassCSS}>loading...</div>

    return <div className={mainClassCSS}>{JSON.stringify(data)}</div>
}