const express = require("express");

const UsuarioService = require("./../services/usuario.service");
const {validatorHandler} = require("../middlewares/validator.handler"); //valida los schemas
const { checkRoles } = require("./../middlewares/auth.handler"); //para verificar el rol
const {
  updateUsuarioSchema,
  createUsuarioSchema,
  getUsuarioSchema,
} = require("./../schemas/usuario.schema");

const router = express.Router();
const service = new UsuarioService();

router.get("/", checkRoles("admin"), async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getUsuarioSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkRoles("admin"),
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

router.patch(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getUsuarioSchema, "params"),
  validatorHandler(updateUsuarioSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  checkRoles("admin"),
  validatorHandler(getUsuarioSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
