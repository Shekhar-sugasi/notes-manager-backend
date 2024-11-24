const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const noteRoutes = require("./routes/noteRoutes");
const PORT = process.env.PORT || 3100;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/notes", noteRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
