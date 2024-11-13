module.exports = (app) => {
  const awards = require("../controllers/award.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Award for a Student
  //router.post("/:studentId/awards/", [authenticate], awards.create);
  router.post("/:studentId/awards/", awards.create);

  // Retrieve all Awards for a Student
  router.get(
    "/:studentId/awards/",
    awards.findAllForStudent
  );

  // Retrieve a single Award with id
  //router.get("/:studentId/awards/:id", [authenticate], awards.findOne);
  router.get("/:studentId/awards/:id", awards.findOne);

  // Update a Award with id
  router.put("/:studentId/awards/:id", awards.update);

  // Delete a Award with id
  router.delete("/:studentId/awards/:id", awards.delete);

  // Delete all Awards
  router.delete("/:studentId/awards/deleteAll", awards.deleteAll);

  app.use("/resume-t5/students", router);
};
