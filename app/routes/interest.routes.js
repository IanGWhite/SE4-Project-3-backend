module.exports = (app) => {
  const interests = require("../controllers/interest.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Interest for a Student
  //router.post("/:studentId/interests/", [authenticate], interests.create);
  router.post("/:studentId/interests/", interests.create);

  // Retrieve all Interests for a Student
  router.get(
    "/:studentId/interests/",
    interests.findAllForStudent
  );

  // Retrieve a single Interest with id
  //router.get("/:studentId/interests/:id", [authenticate], interests.findOne);
  router.get("/:studentId/interests/:id", interests.findOne);

  // Update a Interest with id
  router.put("/:studentId/interests/:id", interests.update);

  // Delete a Interest with id
  router.delete("/:studentId/interests/:id", interests.delete);

  // Delete all Interests
  router.delete("/:studentId/interests/deleteAll", interests.deleteAll);

  app.use("/resume-t5/students", router);
};
