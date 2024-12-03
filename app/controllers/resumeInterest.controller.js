const db = require("../models");
const ResumeInterest = db.resumeInterest;
const Op = db.Sequelize.Op;
// Create and Save a new ResumeInterest
exports.create = (req, res) => {
  //Validate request
  if (!req.params.studentId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ResumeInterest
  const resumeInterest = {
    studentId: req.params.studentId,
    resumeId: req.params.resumeId,
    interestId: req.params.interestId,
  };
  // Save ResumeInterest in the database
  ResumeInterest.create(resumeInterest)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ResumeInterest.",
      });
    });
};
// Retrieve all Interests from the database.
exports.findAll = (req, res) => {
  const resumeInterestId = req.query.resumeInterestId;
  var condition = resumeInterestId
    ? {
        resumeInterestId: {
          [Op.like]: `%${resumeInterestId}%`,
        },
      }
    : null;

  ResumeInterest.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeInterests.",
      });
    });
};
// Retrieve all Interests for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  ResumeInterest.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeInterests.",
      });
    });
};
// Retrieve all Interests for a resume from the database.
exports.findAllForResume = (req, res) => {
    const resumeId = req.params.resumeId;
  
    ResumeInterest.findAll({ where: { resumeId: resumeId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving resumeInterests.",
        });
      });
  };
// Find a single ResumeInterest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ResumeInterest.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ResumeInterest with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ResumeInterest with id=" + id,
      });
    });
};
// Update a ResumeInterest by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ResumeInterest.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeInterest was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ResumeInterest with id=${id}. Maybe ResumeInterest was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ResumeInterest with id=" + id,
      });
    });
};
// Delete a ResumeInterest with the specified id in the request
//todo: update to delete all items owned by resumeInterest (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ResumeInterest.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeInterest was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ResumeInterest with id=${id}. Maybe ResumeInterest was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ResumeInterest with id=" + id,
      });
    });
};
// Delete all Interests from the database.
exports.deleteAll = (req, res) => {
  ResumeInterest.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Interests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumeInterests.",
      });
    });
};

