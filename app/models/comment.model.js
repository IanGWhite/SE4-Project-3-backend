module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    summary: {
      type: Sequelize.STRING(1000),
    },
  });
  return Comment;
};
