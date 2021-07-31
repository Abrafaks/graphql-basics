const Query = {
  posts(parent, args, { db }, info) {
    return db.posts;
  },
  users(parent, args, { db }, info) {
    return db.users;
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export default Query;
