"use client"

import {useState} from 'react'
import {API_BASE_URL} from '@/app/utils/apiClient'

import AirportDropdown from "@/app/airports/dropdown"
import PredictionResultTable from './tables';

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
                ...data
                // predictions: data && data.predictions ? [...data.predictions] : []
            }))
        }

    }

    const btnClassName = predictData.loading ? "btn-disabled" : "btn-primary"
    const btnLabel = predictData.loading ? "Loading...": "Help me"
    return <div><form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-3">
            <div>
                <label htmlFor='startingAirport'>
                        
                Starting Airport
                    </label>
                <AirportDropdown 
                    name='startingAirport' 
                    value={startAirportVal}
                    onChange={e => setStartAirportVal(e.target.value)} />
                    </div>
            <div>
                <label htmlFor='destinationAirport'>
                        
                    Destination Airport
                    </label>
                <AirportDropdown 
                    name='destinationAirport'
                    value={endAirportVal} 
                    onChange={e => setEndAirportVal(e.target.value)} 
                    filterval={startAirportVal}  />
                        </div>
        </div>

        <div className="grid md:grid-cols-6 md:gap-3">
            <div>
        
         <input type='checkbox' name='isNonStop' id='isNonStop' />
            <label htmlFor='isNonStop'>
                
                Non stop flight?
            </label>
        </div>
        <div>
        <input type='checkbox' name='isBasicEconomy' id='isBasicEconomy'  />
            <label htmlFor='isBasicEconomy'>
                
                Basic Economy?
            </label>
        </div>
        <div>
            <input type='checkbox' name='isRefundable' id='isRefundable' />
            <label htmlFor='isRefundable'>
               
                Refundable?
            </label>
        </div>
        <div className="md:col-span-3">
            <button disabled={predictData.loading} className={`${btnClassName} float-right`} type="submit">{btnLabel}</button>
        </div>
        </div>
    </form>

    {predictData.loading ? 
        <div>Thinking...</div>: 
        <PredictionResultTable results={predictData && predictData.predictions} recommendation={predictData.recommendation} startAirport={startAirportVal} endAirport={endAirportVal} />
    }
        
    </div>
}