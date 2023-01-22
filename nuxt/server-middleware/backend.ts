import express, { Request } from 'express'
import bodyParser from 'body-parser'
import axios, { AxiosRequestConfig } from 'axios'
import { readFile, utils, read } from 'xlsx'

const app = express()
app.use(bodyParser.json())
app.get('/extractdata', (req: Request<{ url: string }>, res) => {
  const datasheet = readFile(req.query.url as string)

  console.log(utils.sheet_to_csv(datasheet))
  // console.log(decodeURIComponent(req.query.url as string))
  res.json({ 1: 1 })
})

app.all('/getJSON', (_, res) => {
  res.json({ data: 'data' })
})

module.exports = app
