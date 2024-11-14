module.exports = (app) => {
  const skills = require("../controllers/skill.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Skill for a Student
  //router.post("/:studentId/skills/", [authenticate], skills.create);
  router.post("/:studentId/skills/", skills.create);

  // Retrieve all Skills for a Student
  router.get(
    "/:studentId/skills/",
    skills.findAllForStudent
  );

  // Retrieve a single Skill with id
  //router.get("/:studentId/skills/:id", [authenticate], skills.findOne);
  router.get("/:studentId/skills/:id", skills.findOne);

  // Update a Skill with id
  router.put("/:studentId/skills/:id", skills.update);

  // Delete a Skill with id
  router.delete("/:studentId/skills/:id", skills.delete);

  // Delete all Skills
  router.delete("/:studentId/skills/deleteAll", skills.deleteAll);

  app.use("/resume-t5/students", router);
};
