const express = require('express')
const puppeteer = require('puppeteer')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

server.get('/get-vid', async (req, res) => {
  const { id } = req.query;

  const url = `https://www.youtube.com/watch?v=${id}`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const data = await page.content()
  res.send({
    data,
    url,
    query: req.query
  })
})


server.listen('8000')
console.log('Server online on port 8000')