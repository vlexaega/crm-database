const typeDefs = `
    type User {
        _id: ID
        userName: String
        email: String
        bio: String
        orders: [Order]
    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        user: User
        users: [User]
    }
    type Mutation {
        addUser(userName: String!, bio: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;