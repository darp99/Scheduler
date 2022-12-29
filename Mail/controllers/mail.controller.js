const db = require("../models");
const Mails = db.mails;
const JOB_SERVICE ="job_service"


const { PublishMessage } = require('../utils')

// Create and Save a new mail
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a mail
  const mails = {
    id:req.body.id,
    name: req.body.name,
    priority :req.body.priority,
    dep:req.body.dep,
    times: req.body.times,
    };

  // Save mail in the database
  Mails.create(mails)
    .then(data => {
    console.log(data);
      PublishMessage(JOB_SERVICE, JSON.stringify(data))

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Mail."
      });
    });
};
