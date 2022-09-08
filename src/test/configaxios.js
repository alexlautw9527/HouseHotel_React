const axios = require("axios")

const method = "GET"
const token = "pnjgvQMITu8AVaZrMNKIQZabi78RY9n7ANBUpL8vQgIOpaFXudktfiIy0cf2"
const url = "/rooms"
const postData = {}
const fetchF2E = axios.create({
  method,
  baseURL: `https://challenge.thef2e.com/api/thef2e2019/stage6`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
  }
})

async function fff() {
  let res = await fetchF2E.request(url, postData)
  cancelIcon(res.data)
}

fff()