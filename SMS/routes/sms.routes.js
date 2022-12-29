module.exports = app => {
  const sms = require("../controllers/sms.controller.js");

  var router = require("express").Router();

  // Create a new SMS
  router.post("/add-task", sms.create);

  // Retrieve all SMS
  router.get("/", sms.findAll);


  app.use('/', router);
};
