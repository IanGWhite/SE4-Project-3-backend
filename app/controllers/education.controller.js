const db = require("../models");
const Education = db.education;
const Op = db.Sequelize.Op;
// Create and Save a new Education
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Education
  const education = {
    studentId: req.params.studentId,
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    degree: req.body.degree,
    gpa: req.body.gpa,
    coursework: req.body.coursework,
  };
  // Save Education in the database
  Education.create(education)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Education.",
      });
    });
};
// Retrieve all Educations from the database.
exports.findAll = (req, res) => {
  const educationId = req.query.educationId;
  var condition = educationId
    ? {
        educationId: {
          [Op.like]: `%${educationId}%`,
        },
      }
    : null;

  Education.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving educations.",
      });
    });
};
// Retrieve all Educations for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  Education.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving educations.",
      });
    });
};
// Find a single Education with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Education.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Education with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Education with id=" + id,
      });
    });
};
// Update a Education by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Education.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Education was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Education with id=${id}. Maybe Education was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Education with id=" + id,
      });
    });
};
// Delete a Education with the specified id in the request
//todo: update to delete all items owned by education (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  Education.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Education was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Education with id=${id}. Maybe Education was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Education with id=" + id,
      });
    });
};
// Delete all Educations from the database.
exports.deleteAll = (req, res) => {
  Education.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Educations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all educations.",
      });
    });
};

