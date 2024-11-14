module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Comment for a Resume
  //router.post("/:studentId/resumes/resumeId/comments/", [authenticate], comments.create);
  router.post("/:studentId/resumes/:resumeId/comments/", comments.create);


  // Retrieve all Comments for a Resume
  router.get(
    "/:studentId/resumes/:resumeId/comments/",
    comments.findAllForResume
  );

  // Retrieve a single Comment with id
  //router.get("/:studentId/resumes/resumeId/comments/:id", [authenticate], comments.findOne);
  router.get("/:studentId/resumes/:resumeId/comments/:id", comments.findOne);

  // Update a Comment with id
  router.put("/:studentId/resumes/:resumeId/comments/:id", comments.update);

  // Delete a Comment with id
  router.delete("/:studentId/resumes/:resumeId/comments/:id", comments.delete);

  // Delete all Comments
  router.delete("/:studentId/resumes/:resumeId/comments/deleteAll", comments.deleteAll);

  app.use("/resume-t5/students", router);
};
