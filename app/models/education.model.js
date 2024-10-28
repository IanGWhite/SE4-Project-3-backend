module.exports = (sequelize, Sequelize) => {
  const Education = sequelize.define("education", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
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
    degree: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gpa: {
      type: Sequelize.STRING,
    },
    coursework: {
      type: Sequelize.STRING(1000),
    },
  });
  return Education;
};
