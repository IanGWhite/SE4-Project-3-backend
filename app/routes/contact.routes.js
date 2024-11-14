module.exports = (app) => {
  const contacts = require("../controllers/contact.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Contact for a Student
  //router.post("/:studentId/contacts/", [authenticate], contacts.create);
  router.post("/:studentId/contacts/", contacts.create);

  // Retrieve all Contacts for a Student
  router.get(
    "/:studentId/contacts/",
    contacts.findAllForStudent
  );

  // Retrieve a single Contact with id
  //router.get("/:studentId/contacts/:id", [authenticate], contacts.findOne);
  router.get("/:studentId/contacts/:id", contacts.findOne);

  // Update a Contact with id
  router.put("/:studentId/contacts/:id", contacts.update);

  // Delete a Contact with id
  router.delete("/:studentId/contacts/:id", contacts.delete);

  // Delete all Contacts
  router.delete("/:studentId/contacts/deleteAll", contacts.deleteAll);

  app.use("/resume-t5/students", router);
};
