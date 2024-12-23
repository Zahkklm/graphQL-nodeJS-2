const { ApolloServer, gql } = require("apollo-server");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { users, posts, comments } = require("./fakedata");

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post { 
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    user_id: ID!
    commentor: User!
    post_id: ID!
    post: Post!
  }

  type Query {
    # User
    users: [User!]!
    user(id: ID!): User!

    #Post
    posts: [Post!]!
    post(id: ID!): Post!

    # Comment
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }
`

const resolvers = {
  Query: {
    // user
    users: () => users,
    user: (parent, args) => {
        const findedUser = users.find(u => u.id === args.id)
        if(!findedUser) return new Error("User Not Found")
        return findedUser
    },

    // post
    posts: () => posts,
    post: (parents, args) => {
        const findedPost = posts.find(p => p.id === args.id)
        if(!findedPost) return new Error("Post Not Found")
        return findedPost
    },

    // comment
    comments: () => comments,
    comment: (parents, args) => {
        const findedComment = comments.find(c => c.id === args.id)
        if(!findedComment) return new Error("Comment Not Found")
        return findedComment
    }
  },
  
  // user altındaki posts ve comments alanı için resolver
  User: {
    posts: (parent, args) => posts.filter(p => p.user_id === parent.id),
    comments: (parent, args) => comments.filter(c => c.user_id === parent.id)
  },
  // post altındaki user ve comments alanları için resolver
  Post: {
    user: (parent, args) => users.find(u => u.id === parent.user_id),
    comments: (parent, args) => comments.filter(c => c.post_id === parent.id)
  },
  // comment altındaki commentor ve post alanları için resolver
  Comment: {
    commentor: (parent, args) => users.find(u => u.id === parent.user_id),
    post: (parent, args) => posts.find(p => p.id === parent.post_id)
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = async () => {
  const { url } = await server.listen(4000);
  console.log(`🚀 Server ready at: ${url}`);
};

startServer();