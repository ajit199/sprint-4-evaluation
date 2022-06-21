const { Router } = require("express");
let News = require("./models/News");
let authRouter = Router();

authRouter.post("/new", (req, res) => {
  let news = new News(req.body);
  news.save((err, success) => {
    if (err) {
      return res.status(500).send({ message: "Error Occured" });
    }
    return res.status(201).send({ message: "Created" });
  });
});

authRouter.get("/all", async (req, res) => {
  try {
    let news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

authRouter.get("/get", async (req, res) => {
  let query = req.query;
  if (query.q) {
    const val = new RegExp(query.q, "i");
    let news = await News.find({ title: val });
    res.status(200).send(news);
  } else if (query.location) {
    let news = await News.find(query);
    res.status(200).send(news);
  } else if (query.author) {
    if (query.author.length > 1) {
      let news = await News.find({ $and: { query } });
      return res.status(200).send(news);
    }
    let news = await News.find(query);
    res.status(200).send(news);
  } else if (query.tags) {
    let news = await News.find(query);
    res.status(200).send(news);
  } else if (query.pageSize && query.pageNo) {
    let news = await News.find()
      .limit(query.pageSize)
      .skip(query.pageSize * query.pageNo);
    res.status(200).send(news);
  } else if (query.title) {
    let count = await News.find(query);
    let total = count[0].totalViews;
    if (total > 100) {
      count[0].category = "top";
    } else if (total > 50 && total < 101) {
      count[0].category = "trending";
    } else if (total < 50) {
      count[0].category = "new";
    }
    let news = await News.findOneAndUpdate(query, { totalViews: total + 1 });
    res.status(200).send(news);
  } else if (query.ID) {
    let count = await News.findById(query.ID);
    let total = count.totalViews;
    if (total > 100) {
      count.category = "top";
    } else if (total > 50 && total < 101) {
      count.category = "trending";
    } else if (total < 50) {
      count.category = "new";
    }
    let news = await News.findByIdAndUpdate(query.ID, {
      totalViews: total + 1,
    });
    res.status(200).send(news);
  }
});

module.exports = authRouter;
