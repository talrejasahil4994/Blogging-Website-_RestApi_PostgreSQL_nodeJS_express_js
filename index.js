import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;
const db=new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Blog",
  password: "sahilboy9565", 
  port: 5433,
});

db.connect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts",async(req,res)=>{
try{ const re= await db.query("SELECT * from blog");
 res.json(re.rows);}
 catch(err){
  res.status(500).json({ error: err.message });
 }
});
//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM blog WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//CHALLENGE 3: POST a new post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  const date = new Date().toISOString();

  try {
    const result = await db.query(
      "INSERT INTO blog (title, content, author, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, author, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter

app.patch("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  try {
    const existing = await db.query("SELECT * FROM blog WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = {
      title: title || existing.rows[0].title,
      content: content || existing.rows[0].contetn,
      author: author || existing.rows[0].author,
    };

    const result = await db.query(
      "UPDATE blog SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *",
      [updatedPost.title, updatedPost.content, updatedPost.author, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query("DELETE FROM blog WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json({ message: "Post deleted"});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//handle the search bar's get request
app.get("/search", async (req, res) => {
const title=req.query.title;
try{ const re= await db.query("SELECT * from blog where LOWER(title) LIKE  $1 || '%' ",[title.toLowerCase()]);
 res.json(re.rows);}
 catch(err){
  res.status(500).json({ error: err.message });
 } 
});

//handle the select author's get request
app.get("/blogger", async (req, res) => {
const author=req.query.author;
try{ const re= await db.query("SELECT * from blog where author =$1 ",[author]);
 res.json(re.rows);}
 catch(err){
  res.status(500).json({ error: err.message });
 } 
});
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
