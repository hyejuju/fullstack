require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('data', function getData (req) {
  return req.method === 'POST' ? JSON.stringify(req.body) : null
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

let persons = [
  {
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]


app.get('/info', (request, response) => {
  var date = new Date()
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log(persons)
    response.json(persons)
  })
})

app.get('/api/persons/:id',(request, response, next) => {
  /* const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(p => p.id ===id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    } */
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json((person))
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  /* const body = request.body

    const person = {
     name: body.name,
     number: body.number,
   }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
     .then(person => {
       response.json(person)
     })
    .catch(error => next(error))  */

  const { name, number } = request.body
  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  })

  const names = persons.map(p => p.name)
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  else if(names.some(n => n===body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  else{
    //persons = persons.concat(person)
    //response.json(person)

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
      .catch(error => next(error))
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})