var mongoose  = require("mongoose");

var ArticleSchema = new mongoose.Schema(
  {
      "title": String,
      "author": String,
      "source": String,
      "link": String,
      "tags": String,
      "rating": String,
  }
);

mongoose.model("Article", ArticleSchema);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/thoraeu");

module.exports = mongoose;
