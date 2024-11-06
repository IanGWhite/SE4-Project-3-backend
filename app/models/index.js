const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.lesson = require("./lesson.model.js")(sequelize, Sequelize);

db.award = require("./award.model.js")(sequelize, Sequelize);
db.contact = require("./contact.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.interest = require("./interest.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

// db.resumeAward = require("./resumeAward.model.js")(sequelize, Sequelize);
// db.resumeEducation = require("./resumeEducation.model.js")(sequelize, Sequelize);
// db.resumeExperience = require("./resumeExperience.model.js")(sequelize, Sequelize);
// db.resumeInterest = require("./resumeInterest.model.js")(sequelize, Sequelize);
// db.resumeLink = require("./resumeLink.model.js")(sequelize, Sequelize);
// db.resumeProject = require("./resumeProject.model.js")(sequelize, Sequelize);
// db.resumeSkill = require("./resumeSkill.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.user.hasMany(
  db.comment,
  { as: "comment" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for students
db.user.hasOne(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for lessons
db.student.hasMany(
  db.lesson,
  { as: "lesson" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.lesson.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// RESUME HAS
db.resume.hasMany(
  db.award,
  {as: "award"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.award.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasOne(
  db.contact,
  {as: "contact"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.contact.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.education,
  {as: "education"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.education.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.experience,
  {as: "experience"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.experience.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.interest,
  {as: "interest"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.interest.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.link,
  {as: "link"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.link.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.project,
  {as: "project"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.project.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.skill,
  {as: "skill"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.skill.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.comment,
  {as: "comment"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.comment.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);



// BELONGS TO
// db.resumeAward.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.contact.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeEducation.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeExperience.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeInterest.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeLink.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeProject.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeSkill.belongsTo(
//   db.resume,
//   { as: "resume" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

// // resume middleman has
// db.resumeAward.hasMany(
//   db.award,
//   {as: "award"},
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeEducation.hasMany(
//   db.education,
//   {as: "education"},
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeExperience.hasMany(
//   db.experience,
//   {as: "experience"},
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeInterest.hasMany(
//   db.interest,
//   {as: "interest"},
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeLink.hasMany(
//   db.link,
//   {as: "link"},
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeProject.hasMany(
//   db.project,
//   {as: "project"},
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.resumeSkill.hasMany(
//   db.skill,
//   {as: "skill"},
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

module.exports = db;
