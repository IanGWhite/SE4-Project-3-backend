module.exports = (app) => {
  const resumeExperiences = require("../controllers/resumeExperience.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new ResumeExperience for a Student
  //router.post("/:studentId/resumeExperiences/", [authenticate], resumeExperiences.create);
  router.post("/:studentId/:resumeId/resumeExperiences/:experienceId", resumeExperiences.create);


  // Retrieve all ResumeExperiences for a Resume
  router.get(
    "/:studentId/:resumeId/resumeExperiences/",
    resumeExperiences.findAllForResume
  );

  // Retrieve a single ResumeExperience with id
  //router.get("/:studentId/resumeExperiences/:id", [authenticate], resumeExperiences.findOne);
  router.get("/:studentId/:resumeId/resumeExperiences/:id", resumeExperiences.findOne);

  // Update a ResumeExperience with id
  router.put("/:studentId/:resumeId/resumeExperiences/:id", resumeExperiences.update);

  // Delete a ResumeExperience with id
  router.delete("/:studentId/:resumeId/resumeExperiences/:id", resumeExperiences.delete);

  // Delete all ResumeExperiences
  router.delete("/:studentId/:resumeId/resumeExperiences/deleteAll", resumeExperiences.deleteAll);

  app.use("/resume-t5/students", router);
};