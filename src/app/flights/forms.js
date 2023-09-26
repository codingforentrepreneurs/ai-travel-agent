import {API_BASE_URL} from '@/app/utils/apiClient'

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
        <input type='text' name='query' placeholder='Your query...' />
        <input type='text' name='arg2' placeholder='Your query...' />
        <button type="submit">Send</button>
    </form>
}