module.exports = (app) => {
  const resumes = require("../controllers/resume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Resume for a Student
  //router.post("/:studentId/resumes/", [authenticate], resumes.create);
  router.post("/:studentId/resumes/", resumes.create);

  // Retrieve all Resumes for a Student
  router.get(
    "/:studentId/resumes/",
    resumes.findAllForStudent
  );

  // Retrieve a single Resume with id
  //router.get("/:studentId/resumes/:id", [authenticate], resumes.findOne);
  router.get("/:studentId/resumes/:id", resumes.findOne);

  // Update a Resume with id
  router.put("/:studentId/resumes/:id", resumes.update);

  // Delete a Resume with id
  router.delete("/:studentId/resumes/:id", resumes.delete);

  // Delete all Resumes
  router.delete("/:studentId/resumes/deleteAll", resumes.deleteAll);

  app.use("/resume-t5/students", router);
};
