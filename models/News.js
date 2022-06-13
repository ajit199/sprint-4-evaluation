let { Schema, model } = require("mongoose");

const newsSchema = new Schema({
  title: String,
  description: String,
  date:  {type:Date,default:Date},
  author: {
    type: String,
    enum: [
      "Mathias",
      "Newburn",
      "Rey Rutty",
      "Magdaia Shellard",
      "Kathrine Faichney",
    ],
},
    location: {
      type: String,
      enum: ["London", "New York"],
    },
    tags: {
      type: String,
      enum: ["politics", "crime", "tech", "sports", "health"],
    },
    totalViews: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ["trending", "top", "new"],
    },
});

let News = new model("News", newsSchema);
module.exports = News;
