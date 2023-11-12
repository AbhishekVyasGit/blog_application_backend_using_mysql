require("dotenv").config();
const express = require('express');
const allRoutes = require("./src/routes/allRoutes");
const app = express();
const PORT =  process.env.PORT || 8007;

app.use(express.json());

app.use("/",allRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
