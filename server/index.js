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

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const port = process.env.PORT_SERVER || 4000;
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
