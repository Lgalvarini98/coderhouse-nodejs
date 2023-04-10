import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const app = express()

let clients = [
    {id: 1, name: 'Shakira', phone: '123'},
    {id: 2, name: 'Piqué', phone: '456'},
]
let counter = 3

let schema = buildSchema(`
    type Client {
        id: Int
        name: String
        phone: String
    }

    type Query {
        clients: [Client]
        clientById(id:Int): Client
    }

    type Mutation {
        addClient(name: String, phone: String): Client
    }
`)

const root = {
    clients: () => clients,
    clientById: (data) => {
        for (let i=0; i<clients.length; i++) {
            if (clients[i].id === data.id) return clients[i]
        }
        return {}
    },
    addClient: (data) => {
        let client = {'id': counter, 'name': data.name, 'phone': data.phone}
        clients.push(client)
        counter++
        return client
    }
}

app.use('/api', graphqlHTTP({
    schema,
    rootValue: root
}))

app.listen(8080, () => console.log('Server Up'))