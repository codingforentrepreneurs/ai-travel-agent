import Link from 'next/link'

import getAirlinePurchaseLink from './links'

export default function PredictionResultTable({results, recommendation, startAirport, endAirport}) {
    if (!results) return <div></div>
    if (results.length === 0) return <div></div>
    const firstResult = results[0]
    const colNames = Object.keys(firstResult)
    const priceColIdx = colNames.map(x=>x.toLocaleLowerCase()).indexOf('price')
    const dateColIdx = colNames.map(x=>x.toLocaleLowerCase()).indexOf('date')
    const requestIdColIdx = colNames.map(x=>x.toLocaleLowerCase()).indexOf('requestid')
    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                    {colNames.map((col, idx)=>{
                        if (requestIdColIdx === idx) {
                            return  <th scope="col" key={idx} className="px-6 py-3"></th>
                        }
                        return <th scope="col" key={idx} className="px-6 py-3">
                            {col}
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {results.map((pred, trIdx)=>{

                    const trValues = Object.values(pred)
                    let className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    const isRecommended = pred.requestID === recommendation.requestID
                    if (isRecommended) {
                        className = "bg-blue-300 text-black font-bold border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-500 dark:hover:bg-gray-600"
                    }
                    const predDateObject = new Date(Date.parse(pred.date))
                    
                    
                    const airlineLinkData = {
                        airline: pred.airline, 
                        date: predDateObject, from:startAirport, to:endAirport}
                    const purchaseLink = getAirlinePurchaseLink(airlineLinkData)

                    return <tr key={trIdx} className={className}>
                        
                        {trValues && trValues.map((trCol, tcolIdx )=>{
                            if (tcolIdx === requestIdColIdx) {
                                const recLabel = isRecommended ? "->" : ""
                                return <td key={`${trIdx}-${tcolIdx}`}className="px-6 py-4">{recLabel}
                                    </td>
                            }
                            const isDateCol = dateColIdx === tcolIdx
                            const isPriceCol = priceColIdx === tcolIdx
                            const renderedDate = isDateCol ? new Date(Date.parse(trCol)).toLocaleDateString() : null
                            const renderedPrice = isPriceCol ? new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(trCol): null
                            const isOne = trCol === 1
                            const yesVal = isOne ? "Yes": null
                            const isZero = trCol === 0
                            const noVal = isZero ? "No": null
                            const renderedCol = renderedDate ? renderedDate : renderedPrice ? renderedPrice : yesVal ? yesVal : noVal ? noVal :  trCol
                            return  <td key={`${trIdx}-${tcolIdx}`}className="px-6 py-4">
                            
                            {renderedCol}
                        </td>
                        })}

                        <td className="px-6 py-4">
                            {purchaseLink && purchaseLink ? <Link href={purchaseLink} target="_blank">Purchase</Link> : null}
                        </td>
                </tr>
                })}
                
                
            </tbody>
        </table>
    </div>
    
}