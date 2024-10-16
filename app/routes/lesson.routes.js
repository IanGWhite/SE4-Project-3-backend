module.exports = (app) => {
  const lessons = require("../controllers/lesson.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Lesson for a Student
  router.post("/:studentId/lessons/", [authenticate], lessons.create);

  // Retrieve all Lessons for a Student
  router.get(
    "/:studentId/lessons/",
    [authenticate],
    lessons.findAllForStudent
  );

  // Retrieve all published Lessons for a Student
  router.get(
    "/:studentId/lessons/published",
    [authenticate],
    lessons.findAllPublished
  );

  // Retrieve a single Lesson with id
  router.get("/:studentId/lessons/:id", [authenticate], lessons.findOne);

  // Update a Lesson with id
  router.put("/:studentId/lessons/:id", [authenticate], lessons.update);

  // Delete a Lesson with id
  router.delete("/:studentId/lessons/:id", [authenticate], lessons.delete);

  // Delete all Lessons
  router.delete("/:studentId/lessons/:id", [authenticate], lessons.deleteAll);

  app.use("/resume-t5/students", router);
};
