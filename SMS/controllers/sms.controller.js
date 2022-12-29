const db = require("../models");
const Sms = db.sms;


const JOB_SERVICE ="job_service"

const { PublishMessage } = require('../utils')


// Create and Save a new SMS
exports.create = async(req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a SMS
  const sms = {
    id:req.body.id,
    name: req.body.name,
    priority :req.body.priority,
    dep:req.body.dep,
    times: req.body.times,
  };


  
  // Save SMS in the database
  Sms.create(sms)
    .then(data => {
console.log(data);
      PublishMessage(JOB_SERVICE, JSON.stringify(data))
console.log("okkkkkkkkkkkkkk");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sms."
      });
    });
};

//Retrieve all sms from the database.
exports.findAll = (req, res) => {

  Sms.findAll()
    .then(data => {
      
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sms."
      });
    });
};
