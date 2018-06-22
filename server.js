const express = require('express');
const graphqlHttp = require('express-graphql');
const userSchema = require('./schemas/schema');
const server = express();

server.use("/salutGraphQL", graphqlHttp({
    schema: userSchema,
    graphiql: true
}));

server.listen(4000, () => console.log('Now browse to localhost:4000/salutGraphQL'));
