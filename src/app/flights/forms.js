"use client"

import {useState} from 'react'
import {API_BASE_URL} from '@/app/utils/apiClient'

import AirportDropdown from "@/app/airports/dropdown"

export default function FlightPredictForm(props) {
    const [startAirportVal, setStartAirportVal] = useState("jfk")
    const [endAirportVal, setEndAirportVal] = useState("lax")
    const [predictData, setPredictData] = useState({
        loading: false
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!predictData.loading) {
            setPredictData(prev=>({
                ...prev,
                loading: true
            }))
            const formData = new FormData(event.target)
            const formObj = Object.fromEntries(formData)
            const jsonData = JSON.stringify(formObj)
            const endpoint = `${API_BASE_URL}/predict`
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonData
            })
            const data = await response.json()
            setPredictData(prev=>({
                ...prev,
                loading: false,
                predictions: data && data.predictions ? [...data.predictions] : []
            }))
        }

    }

    return <div><form onSubmit={handleSubmit}>
        <AirportDropdown 
            name='startingAirport' 
            value={startAirportVal}
            onChange={e => setStartAirportVal(e.target.value)} />
        <AirportDropdown 
            name='destinationAirport'
            value={endAirportVal} 
            onChange={e => setEndAirportVal(e.target.value)} 
            filterval={startAirportVal}  />

        <div>
            <label htmlFor='isNonStop'>
                <input type='checkbox' name='isNonStop' id='isNonStop' />
                Non stop flight?
            </label>
        </div>
        <div>
            <label htmlFor='isBasicEconomy'>
                <input type='checkbox' name='isBasicEconomy' id='isBasicEconomy'  />
                Basic Economy?
            </label>
        </div>
        <div>
            <label htmlFor='isRefundable'>
                <input type='checkbox' name='isRefundable' id='isRefundable' />
                Refundable?
            </label>
        </div>
        {predictData.loading ? <div>Loading </div> : <button type="submit">Send</button>}
    </form>
        {(predictData && predictData.predictions && predictData.predictions.length > 0) && predictData.predictions.map((pred, idx)=>{
            return <div key={idx}>
                  {JSON.stringify(pred)}
                </div>
        })}
    </div>
}