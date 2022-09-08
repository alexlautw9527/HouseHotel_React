import { useEffect, useState } from "react"
import axios from "axios"
import { TOKEN, BASE_URL } from "../config/config"

export function useFetch(url, method, postData) {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const config = {
    method,
    baseURL: BASE_URL,
    url,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
    }
    , data: postData
  }

  useEffect(() => {
    (
      async function () {
        try {
          setLoading(true)
          const response = await axios.request(config)
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