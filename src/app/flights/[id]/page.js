"use client" 
import {notFound} from 'next/navigation'
import Error from 'next/error'

import performAPIGetRequest from '@/app/utils/apiClient'


export default function FlightDetailPage ({params}) {
    const {id} = params
    const path = `/flights/${id}`
    const { data, error, isLoading } = performAPIGetRequest(path)
    if (error) {
        if (error.statusCode === 404) {
            notFound()
        }
        return <Error statusCode={error.statusCode} />
        // return <div>failed to load {JSON.stringify(error)}</div>
    }
    if (isLoading) return <div>loading...</div>
    return <div>{JSON.stringify(data)}</div>
}