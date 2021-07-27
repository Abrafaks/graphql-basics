import { GraphQLServer } from "graphql-yoga";
import { v4 } from "uuid/v4";

let posts = [
  {
    id: "1",
    title: "Title 1",
    body: "Body 1",
    published: true,
    author: "10",
  },
  {
    id: "2",
    title: "Title 2",
    body: "Body 2",
    published: true,
    author: "10",
  },
  {
    id: "3",
    title: "Title 3",
    body: "Body 3",
    published: false,
    author: "11",
  },
];

let users = [
  {
    id: "10",
    name: "Name Surname",
    email: "example1@email.com",
    age: 28,
  },
  {
    id: "11",
    name: "Name Srname",
    email: "example1@email.com",
    age: 25,
  },
  {
    id: "12",
    name: "Nae Sure",
    email: "example1@email.com",
    age: 33,
  },
];

let comments = [
  { id: 1000, text: "Jakis tekst 1", author: "12", post: "1" },
  { id: 1001, text: "Jakis tekst 2", author: "12", post: "1" },
  { id: 1002, text: "Jakis tekst 3", author: "11", post: "2" },
  { id: 1003, text: "Jakis tekst 4", author: "10", post: "2" },
];

const typeDefs = `
  type Query {
    posts: [Post!]!
    users: [User!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

const resolvers = {
  Query: {
    posts() {
      return posts;
    },
    users() {
      return users;
    },
    comments() {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);

      if (emailTaken) {
        throw new Error("This email is taken.");
      }

      const user = {
        id: v4(),
        ...args.data,
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("User not found.");
      }

      const deletedUser = users.splice(userIndex, 1)[0];

      posts = posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }

        return !match;
      });

      comments = comments.filter((comment) => comment.author !== args.id);

      return deletedUser;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);

      if (!userExists) {
        throw new Error("User not found.");
      }

      const post = {
        id: v4(),
        ...args.data,
      };

      posts.push(post);

      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id);

      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      const deletedPost = posts.splice(postIndex, 1)[0];

      comments = comments.filter((comment) => comment.post !== deletedPost.id);

      return deletedPost;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some((post) => post.id === args.data.post);

      if (!userExists) {
        throw new Error("User not found.");
      }

      if (!postExists) {
        throw new Error("Post not found.");
      }

      const comment = {
        id: v4(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => parent.author === user.id);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => parent.post === post.id);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up.");
});
