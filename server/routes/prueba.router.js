const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
    console.log('tines acceso');
    res.send('Hola, tienes acceso!');
});

module.exports = router;
