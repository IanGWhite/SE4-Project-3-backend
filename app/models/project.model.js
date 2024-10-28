module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    name: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.STRING,
    },
    endDate: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING(1000),
    },
  });
  return Project;
};
