module.exports = (sequelize, Sequelize) => {
  const Award = sequelize.define("award", {
    organization: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
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
  return Award;
};
