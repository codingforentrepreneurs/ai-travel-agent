import Link from '@/app/utils/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Flight was not found.</h2>
      <p>Please try again</p>
      <Link href="/flights">Return to Flights</Link>
    </div>
  )
}