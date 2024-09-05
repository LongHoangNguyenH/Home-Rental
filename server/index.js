const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoute = require("./route/auth.js");
const listingRoute = require("./route/listing.js");
const bookingRoute = require("./route/booking.js");
const userRoute = require("./route/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* Routes */
app.use("/auth", authRoute);
app.use("/properties", listingRoute);
app.use("/bookings", bookingRoute);
app.use("/users", userRoute);
/* Mongoose setup */
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dream_Nest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
