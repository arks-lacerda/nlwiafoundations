import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/summary/:id", async (req, res) => {
  try {
    await download(req.params.id)
    const audioConverted = await convert()
    console.log(audioConverted)

    const result = await transcribe(audioConverted)

    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.post("/summary", async (req, res) => {
  try {
    const result = await summarize(req.body.text)
    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

const PORT = 3333
const URL = `http://localhost:${PORT}`

app.listen(PORT, () => {
  console.log(`Server is running on ${URL}`)
})
