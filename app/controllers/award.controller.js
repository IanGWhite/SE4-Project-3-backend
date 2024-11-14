const db = require("../models");
const Award = db.award;
const Op = db.Sequelize.Op;
// Create and Save a new Award
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Award
  const award = {
    studentId: req.params.studentId,
    organization: req.body.organization,
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
  };
  // Save Award in the database
  Award.create(award)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Award.",
      });
    });
};
// Retrieve all Awards from the database.
exports.findAll = (req, res) => {
  const awardId = req.query.awardId;
  var condition = awardId
    ? {
        awardId: {
          [Op.like]: `%${awardId}%`,
        },
      }
    : null;

  Award.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving awards.",
      });
    });
};
// Retrieve all Awards for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Award.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving awards.",
      });
    });
};
// Find a single Award with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Award.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Award with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Award with id=" + id,
      });
    });
};
// Update a Award by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Award.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Award was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Award with id=${id}. Maybe Award was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Award with id=" + id,
      });
    });
};
// Delete a Award with the specified id in the request
//todo: update to delete all items owned by award (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Award.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Award was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Award with id=${id}. Maybe Award was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Award with id=" + id,
      });
    });
};
// Delete all Awards from the database.
exports.deleteAll = (req, res) => {
  Award.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Awards were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all awards.",
      });
    });
};

