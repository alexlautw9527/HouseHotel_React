import { useEffect, useState } from "react"
import axios from "axios"
import { TOKEN, BASE_URL } from "../config/config"

export default function useFetch(url, method, postData) {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchF2E = axios.create({
    method,
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    }
    , data: postData
  })

  useEffect(() => {
    (
      async function () {
        try {
          setLoading(true)
          const response = await fetchF2E.request(url)
          setData(response.data)
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
    )()
  }, [url])

  return { data, error, loading }

}