module.exports = app => {
  const job = require("../controllers/job.controller.js");

  var router = require("express").Router();

  // Create a new job
  router.post("/add-task", job.create);

  // Retrieve all jobs
  router.get("/", job.findAll);

  // Retrive Scheduled job's data
  router.get("/result", job.resultData);
  

  app.use('/', router);
};
