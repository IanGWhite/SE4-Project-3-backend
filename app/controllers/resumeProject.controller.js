const db = require("../models");
const ResumeProject = db.resumeProject;
const Op = db.Sequelize.Op;
// Create and Save a new ResumeProject
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a ResumeProject
  const resumeProject = {
    studentId: req.params.studentId,
    resumeId: req.params.resumeId,
    projectId: req.params.projectId,
  };
  // Save ResumeProject in the database
  ResumeProject.create(resumeProject)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ResumeProject.",
      });
    });
};
// Retrieve all ResumeProjects from the database.
exports.findAll = (req, res) => {
  const resumeProjectId = req.query.resumeProjectId;
  var condition = resumeProjectId
    ? {
        resumeProjectId: {
          [Op.like]: `%${resumeProjectId}%`,
        },
      }
    : null;

  ResumeProject.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeProjects.",
      });
    });
};
// Retrieve all ResumeProjects for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  ResumeProject.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeProjects.",
      });
    });
};
// Retrieve all ResumeProjects for a resume from the database.
exports.findAllForResume = (req, res) => {
    const resumeId = req.params.resumeId;
  
    ResumeProject.findAll({ where: { resumeId: resumeId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving resumeProjects.",
        });
      });
  };
// Find a single ResumeProject with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ResumeProject.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ResumeProject with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ResumeProject with id=" + id,
      });
    });
};
// Update a ResumeProject by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ResumeProject.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeProject was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ResumeProject with id=${id}. Maybe ResumeProject was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ResumeProject with id=" + id,
      });
    });
};
// Delete a ResumeProject with the specified id in the request
//todo: update to delete all items owned by resumeProject (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ResumeProject.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeProject was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ResumeProject with id=${id}. Maybe ResumeProject was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ResumeProject with id=" + id,
      });
    });
};
// Delete all ResumeProjects from the database.
exports.deleteAll = (req, res) => {
  ResumeProject.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ResumeProjects were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumeProjects.",
      });
    });
};

