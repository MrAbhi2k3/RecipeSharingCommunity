const mongoose = require("mongoose");
const { link } = require("../routes/LoginRoute");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
  )

  .then(() => {

    console.log("Connected to the Database Successfully");

  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
