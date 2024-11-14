const db = require("../models");
const Contact = db.contact;
const Op = db.Sequelize.Op;
// Create and Save a new Contact
exports.create = (req, res) => {
  //Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Contact
  const contact = {
    studentId: req.params.studentId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    state: req.body.state,
    email: req.body.email
  };
  // Save Contact in the database
  Contact.create(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact.",
      });
    });
};
// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const contactId = req.query.contactId;
  var condition = contactId
    ? {
        contactId: {
          [Op.like]: `%${contactId}%`,
        },
      }
    : null;

  Contact.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving contacts.",
      });
    });
};
// Retrieve all Contacts for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Contact.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving contacts.",
      });
    });
};
// Find a single Contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Contact.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Contact with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id,
      });
    });
};
// Update a Contact by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Contact.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id,
      });
    });
};
// Delete a Contact with the specified id in the request
//todo: update to delete all items owned by contact (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Contact.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id,
      });
    });
};
// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Contacts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts.",
      });
    });
};

