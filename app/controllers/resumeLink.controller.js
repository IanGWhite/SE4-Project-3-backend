const db = require("../models");
const ResumeLink = db.resumeLink;
const Op = db.Sequelize.Op;
// Create and Save a new ResumeLink
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     //message: "Content can not be empty!",
  //   });
  //   return;
  // }

  // Create a ResumeLink
  const resumeLink = {
    studentId: req.params.studentId,    
    resumeId: req.params.resumeId,
    linkId: req.params.linkId,
    
  };
  // Save ResumeLink in the database
  ResumeLink.create(resumeLink)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ResumeLink.",
      });
    });
};
// Retrieve all ResumeLinks from the database.
exports.findAll = (req, res) => {
  const resumeLinkId = req.query.resumeLinkId;
  var condition = resumeLinkId
    ? {
        resumeLinkId: {
          [Op.like]: `%${resumeLinkId}%`,
        },
      }
    : null;

  ResumeLink.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeLinks.",
      });
    });
};
// Retrieve all ResumeLinks for a student from the database.
exports.findAllForStudent = (req, res) => {
  const studentId = req.params.studentId;

  ResumeLink.findAll({ where: { studentId: studentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving resumeLinks.",
      });
    });
};
// Retrieve all ResumeLinks for a resume from the database.
exports.findAllForResume = (req, res) => {
    const resumeId = req.params.resumeId;
  
    ResumeLink.findAll({ where: { resumeId: resumeId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving resumeLinks.",
        });
      });
  };
// Find a single ResumeLink with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ResumeLink.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ResumeLink with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ResumeLink with id=" + id,
      });
    });
};
// Update a ResumeLink by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ResumeLink.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeLink was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ResumeLink with id=${id}. Maybe ResumeLink was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ResumeLink with id=" + id,
      });
    });
};
// Delete a ResumeLink with the specified id in the request
//todo: update to delete all items owned by resumeLink (if not done automatically)
exports.delete = (req, res) => {
  const id = req.params.id;
  ResumeLink.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ResumeLink was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ResumeLink with id=${id}. Maybe ResumeLink was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ResumeLink with id=" + id,
      });
    });
};
// Delete all ResumeLinks from the database.
exports.deleteAll = (req, res) => {
  ResumeLink.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ResumeLinks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resumeLinks.",
      });
    });
};

