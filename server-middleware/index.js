const app = require('express')()
const axios = require('axios')

const visualCache = []

app.get('/fund-rankings', async (req, res) => {
  try {
    const range = req.query.range || '1Y'

    if (visualCache[range]) {
      return res.json(visualCache[range])
    }

    const baseURL = 'https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/'
    const instance = axios.create({ baseURL })

    const data = await instance.get(`fund-ranking-${range}.json`)
      .then((axiosRes) => {
        return axiosRes.data.data
      })

    visualCache[range] = data

    return res.json(data)
  } catch {
    return res.sendStatus(500)
  }
})

module.exports = app
