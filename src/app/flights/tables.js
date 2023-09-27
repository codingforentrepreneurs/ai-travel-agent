

export default function PredictionResultTable({results}) {
    // {(predictData && predictData.predictions && predictData.predictions.length > 0) && predictData.predictions.map((pred, idx)=>{
    //     return <div key={idx}>
    //           {JSON.stringify(pred)}
    //         </div>
    // })}
    if (!results) return <div></div>
    if (results.length === 0) return <div></div>
    const firstResult = results[0]
    const colNames = Object.keys(firstResult)
    const priceColIdx = colNames.map(x=>x.toLocaleLowerCase()).indexOf('price')
    const dateColIdx = colNames.map(x=>x.toLocaleLowerCase()).indexOf('date')
    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                    {colNames.map((col, idx)=>{
                        return <th scope="col" key={idx} className="px-6 py-3">
                            {col}
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {results.map((pred, trIdx)=>{

                    const trValues = Object.values(pred)
                    return <tr key={trIdx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {trValues && trValues.map((trCol, tcolIdx )=>{
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
                </tr>
                })}
                
                
            </tbody>
        </table>
    </div>
    
}