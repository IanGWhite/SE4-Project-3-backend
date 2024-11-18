module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    fName: {
      type: Sequelize.STRING,
    },
    lName: {
      type: Sequelize.STRING,
    },
  },{ timestamps: false });
  return Student;
};
