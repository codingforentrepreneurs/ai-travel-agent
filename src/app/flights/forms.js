import {API_BASE_URL} from '@/app/utils/apiClient'

import AirportDropdown from "@/app/airports/dropdown"

export default function FlightPredictForm(props) {


    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const formObj = Object.fromEntries(formData)
        const jsonData = JSON.stringify(formObj)
        console.log(jsonData)
        const endpoint = `${API_BASE_URL}/predict`
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
    }

    return <form onSubmit={handleSubmit}>
        <AirportDropdown name='startingAirport' />
        <AirportDropdown name='destinationAirport' />
        <button type="submit">Send</button>
    </form>
}