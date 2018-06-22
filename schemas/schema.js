const graphQL = require('graphql');
const httpRequest = require('../http-handler/http-request');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphQL;



const CompagnyType = new GraphQLObjectType({
    name: 'Compagny',
    fields : () => ({
        id : { type : GraphQLString },
        name : {type : GraphQLString },
        user : {
            type : GraphQLList(UserType),
            resolve : (parentValue, args) => httpRequest.employeesOfTheCompagny(parentValue, args)
        }
    })
});

const UserType = new GraphQLObjectType({
    name : 'User',
    fields :() => ({
        id : { type : GraphQLString },
        firstName : { type : GraphQLString },
        age : { type : GraphQLInt },
        compagny : {
            type : CompagnyType,
            resolve : (parentValue, args) => httpRequest.employeeCompagny(parentValue, args)
        }
    })
});

const MutationType = new GraphQLObjectType({
    name : 'MutationType',
    fields : {
        addUser: {
            type : UserType,
            args: {
                firstName : { type : new GraphQLNonNull(GraphQLString) },
                age : { type : new GraphQLNonNull(GraphQLInt) },
                companyId : { type : GraphQLString }
            },
            resolve : (parentValue, args) => httpRequest.createUser(parentValue, args)
        },
        deleteUser: {
            type : UserType,
            args : { id : { type : new GraphQLNonNull(GraphQLString) }},
            resolve : (parentValue, args) => httpRequest.removeUser(parentValue, args)
        }
    }
});

const RootQueryType = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : () => ({
        user : {
            type : UserType,
            args : { id: { type: GraphQLString } },
            resolve : (parentValue, args) => httpRequest.findOneUser(parentValue, args)
        },
        compagny : {
            type : CompagnyType,
            args: { id: { type: GraphQLString} },
            resolve : (parentValue, args) => httpRequest.findOneCompagny(parentValue, args)
        }
    })
});

module.exports = new GraphQLSchema({
    query : RootQueryType,
    mutation : MutationType
})