module.exports = (app) => {
    const resumeSkills = require("../controllers/resumeSkill.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new ResumeSkill for a Student
    //router.post("/:studentId/resumeSkills/", [authenticate], resumeSkills.create);
    router.post("/:studentId/:resumeId/resumeSkills/:skillId", resumeSkills.create);
  
    // Retrieve all ResumeSkills for a Student
    router.get(
      "/:studentId/:resumeId/resumeSkills/",
      resumeSkills.findAllForResume
    );
  
    // Retrieve a single ResumeSkill with id
    //router.get("/:studentId/resumeSkills/:id", [authenticate], resumeSkills.findOne);
    router.get("/:studentId/:resumeId/resumeSkills/:id", resumeSkills.findOne);
  
    // Update a ResumeSkill with id
    router.put("/:studentId/:resumeId/resumeSkills/:id", resumeSkills.update);
  
    // Delete a ResumeSkill with id
    router.delete("/:studentId/:resumeId/resumeSkills/:id", resumeSkills.delete);
  
    // Delete all ResumeSkills
    router.delete("/:studentId/:resumeId/resumeSkills/deleteAll", resumeSkills.deleteAll);
  
    app.use("/resume-t5/students", router);
  };
  