"use client" // make for frontend only
import performAPIGetRequest from '@/app/utils/apiClient'

export default function AirportDropdown({name, value, filterval, onChange}) {
  const { data, error, isLoading } = performAPIGetRequest("/airports")
  if (error) return <select><option>---Error---</option></select>
  if (isLoading) return <select><option>---Loading---</option></select>
  const displayData = [...data].filter(x=>`${x.value}`.toLocaleLowerCase() != `${filterval}`.toLocaleLowerCase())

  const handleChange = event => {
    if (onChange) {
        onChange(event)
    }
  }
  
  return <select name={name} onChange={handleChange}>
    {displayData.map((airport, idx)=>{
        return <option key={idx} selected={`${value}`.toLocaleLowerCase() === `${airport.value}`.toLocaleLowerCase()} value={airport.value}>{airport.value} - {airport.label}</option>
    })}
    
  </select>
}