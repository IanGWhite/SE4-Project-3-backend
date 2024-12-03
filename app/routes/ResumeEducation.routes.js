module.exports = (app) => {
  const resumeEducations = require("../controllers/resumeEducation.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new ResumeEducation for a Student
  //router.post("/:studentId/resumeEducations/", [authenticate], resumeEducations.create);
  router.post("/:studentId/:resumeId/resumeEducations/:educationId", resumeEducations.create);


  // Retrieve all ResumeEducations for a resume
  router.get(
    "/:studentId/:resumeId/resumeEducations/",
    resumeEducations.findAllForResume
  );

  // Retrieve a single ResumeEducation with id
  //router.get("/:studentId/resumeEducations/:id", [authenticate], resumeEducations.findOne);
  router.get("/:studentId/:resumeId/resumeEducations/:id", resumeEducations.findOne);

  // Update a ResumeEducation with id
  router.put("/:studentId/:resumeId/resumeEducations/:id", resumeEducations.update);

  // Delete a ResumeEducation with id
  router.delete("/:studentId/:resumeId/resumeEducations/:id", resumeEducations.delete);

  // Delete all ResumeEducations
  router.delete("/:studentId/:resumeId/resumeEducations/deleteAll", resumeEducations.deleteAll);

  app.use("/resume-t5/students", router);
};