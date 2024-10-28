module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: Sequelize.STRING(1000),
    },
  });
  return Comment;
};
