module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
  },{ timestamps: false });
  return Student;
};
