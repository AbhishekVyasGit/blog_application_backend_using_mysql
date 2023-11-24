require("dotenv").config();
const express = require("express");
const { db, testConnection } = require("./src/configs/db");
const allRoutes = require("./src/routes/allRoutes");
const app = express();
const PORT = process.env.PORT || 8007;

app.use(express.json());

app.use("/", allRoutes);

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
