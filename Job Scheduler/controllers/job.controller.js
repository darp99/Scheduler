const db = require("../models");
const Job = db.job;
const Sequelize = require("sequelize");

 const { SubscribeMessage } = require('../utils')


const service=  async (payload)=>{

  payload = JSON.parse(payload);
  Job.create(payload)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the job scheduler."
    });
  });
}

SubscribeMessage( service)

// Create and Save a new job
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a job
  const job = {
    id:req.body.id,
    name: req.body.name,
    priority :req.body.priority,
    dep:req.body.dep,
    times: req.body.times,
  };

  // Save job in the database
  Job.create(job)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job Scheduler."
      });
    });
};

//Retrieve all job from the database.
exports.findAll = (req, res) => {
 
  Job.findAll({  order: [[Sequelize.literal('priority'), 'ASC']]})
    .then(data => {
      // console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving job scheduler."
      });
    });
};


exports.resultData = (req, res) => {
 
  Job.findAll({  order: [[Sequelize.literal('priority'), 'ASC']]})
    .then(data => {

      var stack = [];
      var ans = [];    
      for (let i = 0; i < data.length; i++) {
          if (!ans.includes(data[i])) {
              if (data[i].dep === 'null') {
                    ans.push(data[i]);
                   }
              else {
                    stack.push(data[i]);
                  while(stack[stack.length -1 ].dep != "null"  )
                  {
                      var inx = data.find(obj=>obj.name === stack[stack.length -1 ].dep)
                       stack.push(inx)
                  }
                  while(stack.length>0)
                  {
                      const data=stack.pop();
                      ans.push(data);
                  } 
              }
          }
      }
      // console.log(ans.type);

      // console.log(data);
      res.send(ans);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Job Scheduler."
      });
    });
};
