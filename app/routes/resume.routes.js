module.exports = (app) => {
  const resumes = require("../controllers/resume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Resume for a Student
  router.post("/:studentId/resumes/", [authenticate], resumes.create);
//router.post("/makeResumeTest/");

  // Retrieve all Resumes for a Student
  router.get(
    "/:studentId/resumes/",
    [authenticate],
    resumes.findAllForStudent
  );

  // Retrieve all published Resumes for a Student
  router.get(
    "/:studentId/resumes/published",
    [authenticate],
    resumes.findAllPublished
  );

  // Retrieve a single Resume with id
  router.get("/:studentId/resumes/:id", [authenticate], resumes.findOne);

  // Update a Resume with id
  router.put("/:studentId/resumes/:id", [authenticate], resumes.update);

  // Delete a Resume with id
  router.delete("/:studentId/resumes/:id", [authenticate], resumes.delete);

  // Delete all Resumes
  router.delete("/:studentId/resumes/:id", [authenticate], resumes.deleteAll);

  app.use("/resume-t5/students", router);
};
