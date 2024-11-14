const db = require("../models");
const Link = db.link;
const Op = db.Sequelize.Op;
// Create and Save a new Link
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a Link
  const link = {
    studentId: req.params.studentId,    
    type: req.body.type,
    link: req.body.link,
    
  };
  // Save Link in the database
  Link.create(link)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Link.",
      });
    });
};
// Retrieve all Links from the database.
exports.findAll = (req, res) => {
  const linkId = req.query.linkId;
  var condition = linkId
    ? {
        linkId: {
          [Op.like]: `%${linkId}%`,
        },
      }
    : null;

  Link.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving links.",
      });
    });
};
// Retrieve all Links for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Link.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving links.",
      });
    });
};
// Find a single Link with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Link.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Link with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Link with id=" + id,
      });
    });
};
// Update a Link by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Link.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Link was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Link with id=${id}. Maybe Link was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Link with id=" + id,
      });
    });
};
// Delete a Link with the specified id in the request
//todo: update to delete all items owned by link (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Link.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Link was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Link with id=${id}. Maybe Link was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Link with id=" + id,
      });
    });
};
// Delete all Links from the database.
exports.deleteAll = (req, res) => {
  Link.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Links were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all links.",
      });
    });
};

