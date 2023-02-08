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

app.listen(3000, () => {
  console.log("Running on port 3000");
});