module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define("resume", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contact: {
      
    },
    links: {
      
    },
    summary: {
      type: Sequelize.STRING(1000),
    },
    education: {
      
    },
    experience: {
      
    },
    project: {
      
    },
    
  });
  return Resume;
};
