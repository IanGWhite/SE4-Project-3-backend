module.exports = (app) => {
  const educations = require("../controllers/education.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Education for a Student
  //router.post("/:studentId/educations/", [authenticate], educations.create);
  router.post("/:studentId/educations/", educations.create);

  // Retrieve all Educations for a Student
  router.get(
    "/:studentId/educations/",
    educations.findAllForStudent
  );

  // Retrieve a single Education with id
  //router.get("/:studentId/educations/:id", [authenticate], educations.findOne);
  router.get("/:studentId/educations/:id", educations.findOne);

  // Update a Education with id
  router.put("/:studentId/educations/:id", educations.update);

  // Delete a Education with id
  router.delete("/:studentId/educations/:id", educations.delete);

  // Delete all Educations
  router.delete("/:studentId/educations/deleteAll", educations.deleteAll);

  app.use("/resume-t5/students", router);
};
