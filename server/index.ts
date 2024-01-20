import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import Blog from "./model/Blog";

require("dotenv").config();

const app = express();
mongoose.connect(process.env.DATABASE_URL ?? "");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// FIXME: TO REMOVE
async function test() {
  // Create a new blog post object
  const article = new Blog({
    title: "Awesome Post!",
    slug: "awesome-post",
    published: true,
    content: "This is the best post ever",
    tags: ["featured", "announcement"],
  });

  // Insert the article in our MongoDB database
  await article.save();
}

test();

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
