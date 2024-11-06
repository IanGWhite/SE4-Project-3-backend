module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define("resume", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    summary: {
      type: Sequelize.STRING(1000),
    },
  },{ timestamps: false });
  return Resume;
};
