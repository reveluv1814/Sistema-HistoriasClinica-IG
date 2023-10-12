const boom = require("@hapi/boom");
const { models } = require("./../../libs/sequelize");

class GenitalesExService {
  constructor() {}

  async create(data, exploracionFId) {
    // Primero, crea genitalesEx
    const newGenitalesEx= await models.GenitalesEx.create(data);

    // Luego, actualiza la exploracion fisica con el ID de un genitalesEx creado
    await models.ExploracionF.update(
      { genitalesExId: newGenitalesEx.id },
      { where: { id: exploracionFId } }
    );

    return newGenitalesEx;
  }
  async updateGenitalesEx(data, id) {
    // Busca genitalesEx por su ID
    const genitalesEx = await models.GenitalesEx.findByPk(id);

    if (!genitalesEx) {
      throw boom.notFound("GenitalesEx not found");
    }
    const newGenitalesEx = await genitalesEx.update(data);

    return newGenitalesEx;
  }
  async deleteGenitalesEx(id) {
   //busca GenitalesEx para eliminarlo
    const genitalesEx = await models.GenitalesEx.findByPk(id);
    if (!genitalesEx) {
      throw boom.notFound("GenitalesEx not found");
    }
    await genitalesEx.destroy();
    return { message: "GenitalesEx deleted successfully", id };
  }
}

module.exports = GenitalesExService ;