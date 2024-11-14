module.exports = (app) => {
  const experiences = require("../controllers/experience.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Experience for a Student
  //router.post("/:studentId/experiences/", [authenticate], experiences.create);
  router.post("/:studentId/experiences/", experiences.create);

  // Retrieve all Experiences for a Student
  router.get(
    "/:studentId/experiences/",
    experiences.findAllForStudent
  );

  // Retrieve a single Experience with id
  //router.get("/:studentId/experiences/:id", [authenticate], experiences.findOne);
  router.get("/:studentId/experiences/:id", experiences.findOne);

  // Update a Experience with id
  router.put("/:studentId/experiences/:id", experiences.update);

  // Delete a Experience with id
  router.delete("/:studentId/experiences/:id", experiences.delete);

  // Delete all Experiences
  router.delete("/:studentId/experiences/deleteAll", experiences.deleteAll);

  app.use("/resume-t5/students", router);
};
