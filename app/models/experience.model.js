module.exports = (sequelize, Sequelize) => {
  const Experience = sequelize.define("experience", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(1000),
    },
  });
  return Experience;
};
