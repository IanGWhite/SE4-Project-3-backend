require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
console.log('test hello');
const db = require("./app/models");

db.sequelize.sync({force: false});

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


console.log('starting search for routes');
require("./app/routes/auth.routes")(app);
console.log('found auth routes');
require("./app/routes/user.routes")(app);
console.log('found user routes');
require("./app/routes/student.routes")(app);
console.log('found student routes');
require("./app/routes/lesson.routes")(app);
console.log('found lesson routes');
require("./app/routes/resume.routes")(app);
console.log('found resume routes');

require("./app/routes/link.routes")(app);
console.log('found link routes');
require("./app/routes/skill.routes")(app);
console.log('found skill routes');
require("./app/routes/project.routes")(app);
console.log('found project routes');
require("./app/routes/comment.routes")(app);
console.log('found comment routes');

require("./app/routes/award.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/education.routes")(app);
require("./app/routes/experience.routes")(app);
require("./app/routes/interest.routes")(app);

require("./app/routes/ResumeExperience.routes")(app);
console.log('found ResumeExperience routes');
require("./app/routes/ResumeAward.routes")(app);
require("./app/routes/ResumeEducation.routes")(app);
require("./app/routes/resumeInterest.routes")(app);
require("./app/routes/resumeLink.routes")(app);
require("./app/routes/resumeProject.routes")(app);
require("./app/routes/resumeSkill.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3025;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
