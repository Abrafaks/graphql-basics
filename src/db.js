const posts = [
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

const users = [
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

const comments = [
  { id: 1000, text: "Jakis tekst 1", author: "12", post: "1" },
  { id: 1001, text: "Jakis tekst 2", author: "12", post: "1" },
  { id: 1002, text: "Jakis tekst 3", author: "11", post: "2" },
  { id: 1003, text: "Jakis tekst 4", author: "10", post: "2" },
];

const db = { users, posts, comments };

export default db;
