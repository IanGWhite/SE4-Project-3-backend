const db = require("../models");
const ResumeSkill = db.resumeSkill;
const Op = db.Sequelize.Op;
// Create and Save a new ResumeSkill
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a ResumeSkill
  const resumeSkill = {
    studentId: req.params.studentId,
    resumeId: req.params.resumeId,
    skillId: req.params.skillId,
  };
  // Save ResumeSkill in the database
  ResumeSkill.create(resumeSkill)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ResumeSkill.",
      });
    });
};
// Retrieve all ResumeSkills from the database.
exports.findAll = (req, res) => {
  const resumeSkillId = req.query.resumeSkillId;
  var condition = resumeSkillId
    ? {
        resumeSkillId: {
          [Op.like]: `%${resumeSkillId}%`,
        },
      }
    : null;

  ResumeSkill.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeSkills.",
      });
    });
};
// Retrieve all ResumeSkills for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  ResumeSkill.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeSkills.",
      });
    });
};
// Retrieve all ResumeSkills for a resume from the database.
exports.findAllForResume = (req, res) => {
    const resumeId = req.params.resumeId;
  
    ResumeSkill.findAll({ where: { resumeId: resumeId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving resumeSkills.",
        });
      });
  };
// Find a single ResumeSkill with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ResumeSkill.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ResumeSkill with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ResumeSkill with id=" + id,
      });
    });
};
// Update a ResumeSkill by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ResumeSkill.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeSkill was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ResumeSkill with id=${id}. Maybe ResumeSkill was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ResumeSkill with id=" + id,
      });
    });
};
// Delete a ResumeSkill with the specified id in the request
//todo: update to delete all items owned by resumeSkill (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ResumeSkill.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeSkill was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ResumeSkill with id=${id}. Maybe ResumeSkill was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ResumeSkill with id=" + id,
      });
    });
};
// Delete all ResumeSkills from the database.
exports.deleteAll = (req, res) => {
  ResumeSkill.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ResumeSkills were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumeSkills.",
      });
    });
};

