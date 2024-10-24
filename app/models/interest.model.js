module.exports = (sequelize, Sequelize) => {
  const Interest = sequelize.define("interest", {
    description: {
      type: Sequelize.STRING,
    },
  });
  return Interest;
};
