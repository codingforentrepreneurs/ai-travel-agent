"use client" 

import performAPIGetRequest from '@/app/utils/apiClient'

export default function FlightDetailPage ({params}) {
    const {id} = params
    const path = `/flights/${id}`
    const { data, error, isLoading } = performAPIGetRequest(path)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return <div>{JSON.stringify(data)}</div>
}