const db = require("../models");
const ResumeEducation = db.resumeEducation;
const Op = db.Sequelize.Op;
// Create and Save a new ResumeEducation
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a ResumeEducation
  const resumeEducation = {
    studentId: req.params.studentId,
    resumeId: req.params.resumeId,   
    educationId: req.params.educationId,    
 
    
  };
  // Save ResumeEducation in the database
  ResumeEducation.create(resumeEducation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ResumeEducation.",
      });
    });
};
// Retrieve all ResumeEducations from the database.
exports.findAll = (req, res) => {
  const resumeEducationId = req.query.resumeEducationId;
  var condition = resumeEducationId
    ? {
        resumeEducationId: {
          [Op.like]: `%${resumeEducationId}%`,
        },
      }
    : null;

  ResumeEducation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeEducations.",
      });
    });
};
// Retrieve all ResumeEducations for a resume from the database.
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;

  ResumeEducation.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeEducations.",
      });
    });
};
// Find a single ResumeEducation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ResumeEducation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ResumeEducation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ResumeEducation with id=" + id,
      });
    });
};
// Update a ResumeEducation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ResumeEducation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeEducation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ResumeEducation with id=${id}. Maybe ResumeEducation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ResumeEducation with id=" + id,
      });
    });
};
// Delete a ResumeEducation with the specified id in the request
//todo: update to delete all items owned by resumeEducation (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ResumeEducation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeEducation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ResumeEducation with id=${id}. Maybe ResumeEducation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ResumeEducation with id=" + id,
      });
    });
};
// Delete all ResumeEducations from the database.
exports.deleteAll = (req, res) => {
  ResumeEducation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ResumeEducations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumeEducations.",
      });
    });
};