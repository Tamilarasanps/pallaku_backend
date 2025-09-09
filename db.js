const mongoose = require("mongoose");

const connect = async () => {
  const uri = process.env.mongodb_uri;

  console.log('DB : ',process.env.GMAIL_USER)

  // Set strictQuery explicitly to silence warning
  mongoose.set("strictQuery", true); // or false if you want to allow flexible querying

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    process.exit(1); // Exit process on failure
  }
};

module.exports = connect;
