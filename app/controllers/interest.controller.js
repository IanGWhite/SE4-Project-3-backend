const db = require("../models");
const Interest = db.interest;
const Op = db.Sequelize.Op;
// Create and Save a new Interest
exports.create = (req, res) => {
  //Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Interest
  const interest = {
    studentId: req.params.studentId,
    description: req.body.description,
  };
  // Save Interest in the database
  Interest.create(interest)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interest.",
      });
    });
};
// Retrieve all Interests from the database.
exports.findAll = (req, res) => {
  const interestId = req.query.interestId;
  var condition = interestId
    ? {
        interestId: {
          [Op.like]: `%${interestId}%`,
        },
      }
    : null;

  Interest.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving interests.",
      });
    });
};
// Retrieve all Interests for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Interest.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving interests.",
      });
    });
};
// Find a single Interest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Interest.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Interest with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Interest with id=" + id,
      });
    });
};
// Update a Interest by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Interest.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Interest was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Interest with id=${id}. Maybe Interest was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Interest with id=" + id,
      });
    });
};
// Delete a Interest with the specified id in the request
//todo: update to delete all items owned by interest (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Interest.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Interest was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Interest with id=${id}. Maybe Interest was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Interest with id=" + id,
      });
    });
};
// Delete all Interests from the database.
exports.deleteAll = (req, res) => {
  Interest.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Interests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all interests.",
      });
    });
};

