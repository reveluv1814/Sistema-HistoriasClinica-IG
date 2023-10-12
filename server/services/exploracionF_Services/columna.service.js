const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class ColumnaService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea la columna
    const newColumna= await models.Columna.create(data);

    // Luego, actualiza la exploracion fisica con el ID de la columna creada
    await models.ExploracionF.update(
      { columnaId: newColumna.id },
      { where: { id: exploracionFId } }
    );

    return newColumna;
  }
  async updateColumna(data, id) {
    // Busca la columna por su ID
    const columna = await models.Columna.findByPk(id);

    if (!columna) {
      throw boom.notFound("Columna not found");
    }
    const newColumna = await columna.update(data);

    return newColumna;
  }
  async deleteColumna(id) {
   //busca la columna para eliminarlo
    const columna = await models.Columna.findByPk(id);
    if (!columna) {
      throw boom.notFound("Columna not found");
    }
    await columna.destroy();
    return { message: "Columna deleted successfully", id };
  }
}

module.exports = ColumnaService;