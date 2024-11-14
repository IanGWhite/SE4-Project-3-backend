module.exports = (app) => {
  const projects = require("../controllers/project.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Project for a Student
  //router.post("/:studentId/projects/", [authenticate], projects.create);
  router.post("/:studentId/projects/", projects.create);

  // Retrieve all Projects for a Student
  router.get(
    "/:studentId/projects/",
    projects.findAllForStudent
  );

  // Retrieve a single Project with id
  //router.get("/:studentId/projects/:id", [authenticate], projects.findOne);
  router.get("/:studentId/projects/:id", projects.findOne);

  // Update a Project with id
  router.put("/:studentId/projects/:id", projects.update);

  // Delete a Project with id
  router.delete("/:studentId/projects/:id", projects.delete);

  // Delete all Projects
  router.delete("/:studentId/projects/deleteAll", projects.deleteAll);

  app.use("/resume-t5/students", router);
};
