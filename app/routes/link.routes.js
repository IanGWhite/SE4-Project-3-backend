module.exports = (app) => {
  const links = require("../controllers/link.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Link for a Student
  //router.post("/:studentId/links/", [authenticate], links.create);
  router.post("/:studentId/links/", links.create);


  // Retrieve all Links for a Student
  router.get(
    "/:studentId/links/",
    links.findAllForStudent
  );

  // Retrieve a single Link with id
  //router.get("/:studentId/links/:id", [authenticate], links.findOne);
  router.get("/:studentId/links/:id", links.findOne);

  // Update a Link with id
  router.put("/:studentId/links/:id", links.update);

  // Delete a Link with id
  router.delete("/:studentId/links/:id", links.delete);

  // Delete all Links
  router.delete("/:studentId/links/deleteAll", links.deleteAll);

  app.use("/resume-t5/students", router);
};
