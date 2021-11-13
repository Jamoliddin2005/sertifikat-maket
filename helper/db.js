const mongoose = require("mongoose");

module.exports = () => {
  const URI = "mongodb+srv://Jamoliddin:3EFHHNeYUfcornNr@cluster0.dktr4.mongodb.net/SertifikatMaket"

  mongoose.connect(URI, {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;

  db.on("open", () => {
    console.log("server running");
  });

  db.on("error", () => {
    console.log("server error");
  });
};
