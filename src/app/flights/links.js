
function formatDate(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function getAirlinePurchaseLink({airline, date, from, to}) {
    const airlineLower = `${airline}`.toLocaleLowerCase()
    const now = new Date()
    const dateObject = (date instanceof Date && date > now) ? date : now
    dateObject.setDate(dateObject.getDate() + 1)
    
    const dateFormatted = formatDate(dateObject)
    switch (airlineLower) {
        case "american airlines":
            // ref https://www.aa.com/booking/search?locale=en_US&fareType=Lowest&pax=1&adult=1&type=OneWay&searchType=Revenue&cabin=&carriers=AA&slices=%5B%7B%22orig%22:%22LAX%22,%22origNearby%22:false,%22dest%22:%22JFK%22,%22destNearby%22:false,%22date%22:%222023-10-01%22%7D%5D
            let aaData = {
                locale: 'en_US',
                fareType: 'Lowest',
                pax: '1',
                adult: '1',
                type: 'OneWay',
                searchType: 'Revenue',
                cabin: '',
                carriers: 'AA',
                slices: `[{"orig":"${from}","origNearby":false,"dest":"${to}","destNearby":false,"date":"${dateFormatted}"}]`
            };
        
            const aaParams = new URLSearchParams(aaData)
            return `https://www.aa.com/booking/search?${aaParams}`

        case "united":
            const unitedData = {
                f: from,
                t: to,
                d: dateFormatted
            }
            const unitedParams = new URLSearchParams(unitedData)
            return `https://www.united.com/en/us/fsr/choose-flights?${unitedParams}`
        case "jetblue airways":
            const jetblueData = {
                from: from,
                to: to,
                depart: dateFormatted,
                isMultiCity: 'false',
                noOfRoute: 1,
                lang: 'en',
                adults: 1,
                children: 0,
                infants: 0,
                sharedMarket: 'false',
                roundTripFaresFlag: 'false',
                usePoints: 'false'
            }
            const jetblueDataParams = new URLSearchParams(jetblueData)
            return `https://jetblue.com/booking/flights?${jetblueDataParams}`
        default:
            return ''
    }
}
