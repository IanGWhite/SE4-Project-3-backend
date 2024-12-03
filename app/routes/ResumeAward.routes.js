module.exports = (app) => {
  const resumeAwards = require("../controllers/resumeAward.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new ResumeAward for a Student
  //router.post("/:studentId/resumeAwards/", [authenticate], resumeAwards.create);
  router.post("/:studentId/:resumeId/resumeAwards/:awardId", resumeAwards.create);


  // Retrieve all ResumeAwards for a resume
  router.get(
    "/:studentId/:resumeId/resumeAwards/",
    resumeAwards.findAllForResume
  );

  // Retrieve a single ResumeAward with id
  //router.get("/:studentId/resumeAwards/:id", [authenticate], resumeAwards.findOne);
  router.get("/:studentId/:resumeId/resumeAwards/:id", resumeAwards.findOne);

  // Update a ResumeAward with id
  router.put("/:studentId/:resumeId/resumeAwards/:id", resumeAwards.update);

  // Delete a ResumeAward with id
  router.delete("/:studentId/:resumeId/resumeAwards/:id", resumeAwards.delete);

  // Delete all ResumeAwards
  router.delete("/:studentId/:resumeId/resumeAwards/deleteAll", resumeAwards.deleteAll);

  app.use("/resume-t5/students", router);
};