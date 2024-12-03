module.exports = (app) => {
  const resumeProjects = require("../controllers/resumeProject.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new ResumeProject for a Student
  //router.post("/:studentId/resumeProjects/", [authenticate], resumeProjects.create);
  router.post("/:studentId/:resumeId/resumeProjects/:projectId/", resumeProjects.create);

  // Retrieve all ResumeProjects for a Student
  router.get(
    "/:studentId/:resumeId/resumeProjects/",
    resumeProjects.findAllForResume
  );

  // Retrieve a single ResumeProject with id
  //router.get("/:studentId/resumeProjects/:id", [authenticate], resumeProjects.findOne);
  router.get("/:studentId/:resumeId/resumeProjects/:id", resumeProjects.findOne);

  // Update a ResumeProject with id
  router.put("/:studentId/:resumeId/resumeProjects/:id", resumeProjects.update);

  // Delete a ResumeProject with id
  router.delete("/:studentId/:resumeId/resumeProjects/:id", resumeProjects.delete);

  // Delete all ResumeProjects
  router.delete("/:studentId/:resumeId/resumeProjects/deleteAll", resumeProjects.deleteAll);

  app.use("/resume-t5/students", router);
};
