module.exports = app => {
  const mail = require("../controllers/mail.controller.js");
  var router = require("express").Router();

  // Create a new mail
  router.post("/add-task", mail.create);


  app.use('/', router);
};
