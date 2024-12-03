module.exports = (app) => {
  const resumeInterest = require("../controllers/resumeInterest.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Interest for a Student
  //router.post("/:studentId/resumeInterest/", [authenticate], resumeInterest.create);
  router.post("/:studentId/:resumeId/resumeInterest/:interestId/", resumeInterest.create);

  // Retrieve all ResumeInterest for a Student
  router.get(
    "/:studentId/:resumeId/resumeInterest/",
    resumeInterest.findAllForResume
  );

  // Retrieve a single Interest with id
  //router.get("/:studentId/resumeInterest/:id", [authenticate], resumeInterest.findOne);
  router.get("/:studentId/:resumeId/resumeInterest/:id", resumeInterest.findOne);

  // Update a Interest with id
  router.put("/:studentId/:resumeId/resumeInterest/:id", resumeInterest.update);

  // Delete a Interest with id
  router.delete("/:studentId/:resumeId/resumeInterest/:id", resumeInterest.delete);

  // Delete all ResumeInterest
  router.delete("/:studentId/:resumeId/resumeInterest/deleteAll", resumeInterest.deleteAll);

  app.use("/resume-t5/students", router);
};
