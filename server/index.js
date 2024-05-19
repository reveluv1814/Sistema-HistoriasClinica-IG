const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

//----------middlewares----------
//app.use(cors({ origin: "http://localhost:puerto front",}));

const app = express();

// const urlFrontend = process.env.URL_FRONT_SERVICE || "http://localhost:5173";
// app.use(cors({ origin: urlFrontend }));
app.use(cors());
app.use(express.json());
const port = process.env.PORT_SERVER || 4000;
console.log(__dirname);
app.use(express.static("server/public")); //archivos estaticos
require("./auth");
routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
//-------------------------------

app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
