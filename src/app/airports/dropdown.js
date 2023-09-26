"use client" // make for frontend only
import performAPIGetRequest from '@/app/utils/apiClient'

export default function AirportDropdown({name}) {
  const { data, error, isLoading } = performAPIGetRequest("/airports")
  if (error) return <select><option>---Error---</option></select>
  if (isLoading) return <select><option>---Loading---</option></select>
  const displayData = [...data]
  return <select name={name}>
    {displayData.map((airport, idx)=>{
        return <option key={idx} value={airport.value}>{airport.value} - {airport.label}</option>
    })}
    
  </select>
}