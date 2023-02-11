const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

let books = [
  {
    id: 0,
    title: "Harry Potter",
    author: "J.K.Rowling",
  },
  {
    id: 1,
    title: "Revolutionaries : The Other Story of How India Won Its Freedom",
    author: "Sanjeev Sanyal",
  },
  {
    id: 2,
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
  },
  {
    id: 3,
    title: "Node.js Web Development",
    author: "David Herron",
  },
];

app.get("/", (req, res) => {
  res.send("Hello world, Hi!!!");
});

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 *
 */

app.get("/books", (req, res) => {
  res.send(books);
});

/**
 * @swagger
 * /book:
 *   post:
 *     description: Get one book
 *     parameters:
 *     - name: New Book
 *       description: Book details
 *       in: body
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
// {"id":2,"title":"3rd book title"}
app.post("/book", (req, res) => {
  // const id = req.body.id;
  const newBook = req.body;
  books.push(newBook);
  res.send(newBook);
});

/**
 * @swagger
 * /books/update:
 *   patch:
 *     description: Updating book title
 *     parameters:
 *     - name: id
 *       description: Book id
 *       in: body
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.patch("/books/update", (req, res) => {
  let id = req.body.id;
  let bookUpdate = books.find((element) => element.id === id);
  console.log(bookUpdate);

  let index = books.indexOf(bookUpdate);
  console.log(index);
  Object.assign(bookUpdate, req.body);
  books[index] = bookUpdate;
  res.send(bookUpdate);
});

/**
 * @swagger
 * /books/delete:
 *   delete:
 *     description: deleting book with id
 *     parameters:
 *     - name: id
 *       description: Book id
 *       in: body
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.delete("/books/delete", (req, res) => {
  let id = req.body.id;
  let bookUpdate = books.find((element) => element.id === id);

  let index = books.indexOf(bookUpdate);
  books.splice(index, 1);
  res.send("The book with id " + index + " is deleted");
});
app.listen(3000, () => {
  console.log("Running on port 3000");
});
