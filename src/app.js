const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

require("./db/conn");
const User = require("./models/usermsg");

const port = process.env.PORT || 3000;

// index.html file, static path set
const static_path = path.join(__dirname, "../public");
// to identify views folder
const template_path = path.join(__dirname, "../templates/views");
// to identify partials folder
const partialsPath = path.join(__dirname, "../templates/partials");

// middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", async (req, res) => {
  try {
    // console.log(req.body);
    // res.send(req.body)
    const createUserData = new User(req.body);
    await createUserData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("listening on port", port);
});
