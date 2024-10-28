module.exports = (sequelize, Sequelize) => {
  const Link = sequelize.define("link", {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Link;
};
