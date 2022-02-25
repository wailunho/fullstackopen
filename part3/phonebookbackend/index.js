const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())

let persons = [
  {
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456',
  },
  {
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
  },
  {
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345',
  },
  {
    'id': 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const sendError = (msg) => {
    response.status(400).send({ error: msg })
  }

  const { name, number } = request.body
  if (!name) {
    return sendError('name is missing')
  } else if (!number) {
    return sendError('number is missing')
  } else if (persons.find(x => x.name === name)) {
    return sendError('name must be unique')
  }
  const id = Math.floor(Math.random() * 10000)
  const person = {
    id,
    name,
    number,
  }
  persons = persons.concat(person)
  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const p = persons.find(x => x.id === Number(id))
  if (!p) {
    return response.send(404)
  }
  response.json(p)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const p = persons.find(x => x.id === Number(id))
  persons = persons.filter(x => x.id !== Number(id))
  if (!p) {
    return response.send(204)
  }
  response.sendStatus(202)
})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  let p = persons.find(x => x.id === Number(id))
  persons = persons.map(x => x.id === p.id ? Object.assign({ id: p.id }, request.body) : x)
  response.sendStatus(200)
})

app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})