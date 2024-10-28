module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define("skill", {
    description: {
      type: Sequelize.STRING,
    },
  });
  return Skill;
};
