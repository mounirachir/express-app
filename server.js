const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config;

// initialize app
const app = express();

const publicDir = path.join(__dirname, "public");

// Middleware to check time
const checkTime = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue to the next middleware
  } else {
    res.send(
      "Sorry, the website is only available during working hours (Monday to Friday, 9 am to 5 pm)."
    );
  }
};

app.use(checkTime);
app.use(express.static(publicDir));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
