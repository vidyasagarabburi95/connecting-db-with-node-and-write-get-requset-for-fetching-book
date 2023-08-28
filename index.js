const express = require("express");

const { open } = require("sqlite");

const sqlite3 = require("sqlite3");

const path = require("path");

const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const intilizeDBAndserver = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`db Error:${e.message}`);
    process.exit(1);
  }
};

intilizeDBAndserver();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book ORDER BY order_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
