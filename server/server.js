const express = require("express")
const RouterApi = require("./routes/apiRoute")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const CookieParser = require("cookie-parser")
require("dotenv").config()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true })) // Utilisez extended: true pour un parsing plus complexe
app.use(express.json())
app.use(CookieParser())
app.use(cors( [
    {
      "origin": ["http://localhost:3000"],
      "method": ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
      "responseHeader": ["Content-Type"],
      "maxAgeSeconds": 3600
    }
  ]))


app.use("/api", RouterApi)




app.listen(PORT, () => {
    console.log(`le server est demarer sur le url  http://localhost:${PORT}`)
})