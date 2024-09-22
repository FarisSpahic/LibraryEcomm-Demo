require("dotenv").config();
const express = require("express");
const sequelize = require("./database"); // Adjust path as necessary

const bookRoutes = require("./endpoints/book");
const imageRoutes = require("./endpoints/image");


const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use("/api/Book", bookRoutes);
app.use("/api/Image", imageRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// function printEnvVariables() {
//   console.log("Environment Variables:");
//   console.log("======================");
//   console.log(`PORT: ${process.env.PORT}`);
//   console.log(`PUBLIC_KEY: \n${process.env.PUBLIC_KEY}`);
//   console.log(`DB_USER: ${process.env.DB_USER}`);
//   console.log(`DB_HOST: ${process.env.DB_HOST}`);
//   console.log(`DB_NAME: ${process.env.DB_NAME}`);
//   console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
//   console.log(`DB_PORT: ${process.env.DB_PORT}`);
//   console.log("======================");
// }

// printEnvVariables();
