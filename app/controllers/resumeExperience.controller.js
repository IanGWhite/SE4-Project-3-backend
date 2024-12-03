const db = require("../models");
const ResumeExperience = db.resumeExperience;
const Op = db.Sequelize.Op;
// Create and Save a new ResumeExperience
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a ResumeExperience
  const resumeExperience = {
    studentId: req.params.studentId,
    resumeId: req.params.resumeId,
    experienceId: req.params.experienceId,
 
    
  };
  // Save ResumeExperience in the database
  ResumeExperience.create(resumeExperience)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ResumeExperience.",
      });
    });
};
// Retrieve all ResumeExperiences from the database.
exports.findAll = (req, res) => {
  const resumeExperienceId = req.query.resumeExperienceId;
  var condition = resumeExperienceId
    ? {
        resumeExperienceId: {
          [Op.like]: `%${resumeExperienceId}%`,
        },
      }
    : null;

  ResumeExperience.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeExperiences.",
      });
    });
};
// Retrieve all ResumeExperiences for a resume from the database.
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;

  ResumeExperience.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeExperiences.",
      });
    });
};
// Find a single ResumeExperience with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ResumeExperience.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ResumeExperience with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ResumeExperience with id=" + id,
      });
    });
};
// Update a ResumeExperience by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ResumeExperience.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeExperience was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ResumeExperience with id=${id}. Maybe ResumeExperience was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ResumeExperience with id=" + id,
      });
    });
};
// Delete a ResumeExperience with the specified id in the request
//todo: update to delete all items owned by resumeExperience (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ResumeExperience.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeExperience was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ResumeExperience with id=${id}. Maybe ResumeExperience was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ResumeExperience with id=" + id,
      });
    });
};
// Delete all ResumeExperiences from the database.
exports.deleteAll = (req, res) => {
  ResumeExperience.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ResumeExperiences were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumeExperiences.",
      });
    });
};