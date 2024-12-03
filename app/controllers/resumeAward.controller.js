const db = require("../models");
const ResumeAward = db.resumeAward;
const Op = db.Sequelize.Op;
// Create and Save a new ResumeAward
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a ResumeAward
  const resumeAward = {
    studentId: req.params.studentId,
    resumeId: req.params.resumeId,
    awardId: req.params.awardId,
 
    
  };
  // Save ResumeAward in the database
  ResumeAward.create(resumeAward)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ResumeAward.",
      });
    });
};
// Retrieve all ResumeAwards from the database.
exports.findAll = (req, res) => {
  const resumeAwardId = req.query.resumeAwardId;
  var condition = resumeAwardId
    ? {
        resumeAwardId: {
          [Op.like]: `%${resumeAwardId}%`,
        },
      }
    : null;

  ResumeAward.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeAwards.",
      });
    });
};
// Retrieve all ResumeAwards for a resume from the database.
exports.findAllForResume = (req, res) => {
  const resumeId = req.params.resumeId;

  ResumeAward.findAll({ where: { resumeId: resumeId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeAwards.",
      });
    });
};
// Find a single ResumeAward with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ResumeAward.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ResumeAward with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ResumeAward with id=" + id,
      });
    });
};
// Update a ResumeAward by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ResumeAward.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeAward was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ResumeAward with id=${id}. Maybe ResumeAward was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ResumeAward with id=" + id,
      });
    });
};
// Delete a ResumeAward with the specified id in the request
//todo: update to delete all items owned by resumeAward (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ResumeAward.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeAward was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ResumeAward with id=${id}. Maybe ResumeAward was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ResumeAward with id=" + id,
      });
    });
};
// Delete all ResumeAwards from the database.
exports.deleteAll = (req, res) => {
  ResumeAward.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ResumeAwards were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumeAwards.",
      });
    });
};