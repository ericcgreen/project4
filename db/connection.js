var mongoose  = require("mongoose");

var ArticleSchema = new mongoose.Schema(
  {
      "title": String,
      "author": String,
      "source": String,
      "link": String,
      "tags": String,
  }
);

mongoose.model("Article", ArticleSchema);
mongoose.connect("mongodb://localhost/whenpresident");

module.exports = mongoose;
