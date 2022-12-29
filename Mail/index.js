
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// })
// .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });


// simple route
app.get("/home", (req, res) => {
  res.json({ message: "Welcome to Mail application." });
});

require("./routes/mail.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
