module.exports = (app) => {
  const resumeLinks = require("../controllers/resumeLink.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new ResumeLink for a Student
  //router.post("/:studentId/resumeLinks/", [authenticate], resumeLinks.create);
  router.post("/:studentId/:resumeId/resumeLinks/:linkId/", resumeLinks.create);


  // Retrieve all ResumeLinks for a Student
  router.get(
    "/:studentId/:resumeId/resumeLinks/",
    resumeLinks.findAllForResume
  );

  // Retrieve a single ResumeLink with id
  //router.get("/:studentId/resumeLinks/:id", [authenticate], resumeLinks.findOne);
  router.get("/:studentId/:resumeId/resumeLinks/:id", resumeLinks.findOne);

  // Update a ResumeLink with id
  router.put("/:studentId/:resumeId/resumeLinks/:id", resumeLinks.update);

  // Delete a ResumeLink with id
  router.delete("/:studentId/:resumeId/resumeLinks/:id", resumeLinks.delete);

  // Delete all ResumeLinks
  router.delete("/:studentId/:resumeId/resumeLinks/deleteAll", resumeLinks.deleteAll);

  app.use("/resume-t5/students", router);
};
