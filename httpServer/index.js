const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const port = process.env.port || 5000

// parse application/json
app.use(bodyParser.json())

morgan('tiny')

app.use(cors())

app.use(require('./src/routes'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Restaurants app listening at http://localhost:${port}`))

module.exports = app