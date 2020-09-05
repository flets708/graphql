const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema')
const cors = require('cors')
const app = express();

app.use(cors())

mongoose.connect('mongodb+srv://admin:admin@cluster0.camzg.mongodb.net/test?retryWrites=true&w=majority');

mongoose.connection.once('open', ()=>{
    console.log('db connected');
})

app.use('/graphql', graphqlHTTP({
 schema,
 graphiql: true
}))

process.on('exit', () => { console.log('exiting…'); process.exit(); });

app.listen(4000, () =>{
    console.log('Listening port 4000');
});