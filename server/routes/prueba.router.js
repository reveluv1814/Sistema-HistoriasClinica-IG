const express = require("express");

const UsuarioService = require("./../services/usuario.service");
const {validatorHandler} = require("../middlewares/validator.handler"); //valida los schemas
const {createUsuarioSchema} = require("./../schemas/usuario.schema");

const router = express.Router();
const service = new UsuarioService();


router.get("/", async (req, res, next) => {
    console.log('tines acceso');
    res.send('Hola, tienes acceso!');
});
router.post(
    "/",
    validatorHandler(createUsuarioSchema, "body"),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newCategory = await service.create(body);
        res.status(201).json(newCategory);
      } catch (error) {
        next(error);
      }
    }
  );
module.exports = router;
