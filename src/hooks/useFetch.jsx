import { useEffect, useState } from "react"

function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data")
        }

        return res.json()
      })
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)

        setError(error.message)
        setLoading(false)
      })
  }, [url])

  return {
    data,
    loading,
    error
  }
}

export default useFetch