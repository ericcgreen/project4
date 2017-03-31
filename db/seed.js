const mongoose  = require("./connection");
const seedData  = require("./seeds");

var Article = mongoose.model("Article");

Article.remove({}).then(function(){
  Article.collection.insert(seedData).then(function(){
    process.exit();
  });
});
