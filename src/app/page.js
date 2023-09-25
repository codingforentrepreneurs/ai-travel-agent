"use client" // make for frontend only

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const url = "http://localhost:8080/hello-world"
  const { data, error, isLoading } = useSWR(url, fetcher)
  const mainClassCSS ="flex min-h-screen flex-col items-center justify-between p-24"
  if (error) return <div className={mainClassCSS}>failed to load</div>
  if (isLoading) return <div className={mainClassCSS}>loading...</div>
  console.log(data)
  const myVar = "word"
  return ( // jsx
    <main className={mainClassCSS}>
      <h1>hello {myVar}</h1>
      <div>{JSON.stringify(data)}</div>
    </main>
  )
}
