const { Village } = require("../models");

module.exports = {
  async createVillage(req, res, next) {
    try {
      const { name, leader, history } = await Village.create(req.body);
      res.status(201).json({ message: `Village ${name} created.` });
    } catch (err) {
      next(err);
    }
  },

  async getVillages(req, res, next) {
    try {
      const villages = await Village.findAll();
      res.status(200).json(villages);
    } catch (err) {
      next(err);
    }
  },

  async getVillageById(req, res, next) {
    const id = req.params.id;
    try {
      const village = await Village.findByPk(id);
      if (!village) {
        throw { name: "Village not found." };
      }
      res.status(200).json(village);
    } catch (err) {
      next(err);
    }
  },

  async updateVillageById(req, res, next) {
    const { name, leader, history } = req.body;
    const id = req.params.id;
    try {
      const village = await Village.findByPk(id);
      if (!village) {
        throw { name: "Village not found." };
      }
      await village.update({ name, leader, history });
      res.status(200).json({ message: `Village id ${id} updated.` });
    } catch (err) {
      next(err);
    }
  },

  async deleteVillageById(req, res, next) {
    const id = req.params.id;
    try {
      const village = await Village.findByPk(id);
      if (!village) {
        throw { name: "Village not found." };
      }
      await village.destroy();
      res.status(200).json({ message: `Village id ${id} deleted.` });
    } catch (err) {
      next(err);
    }
  },
};
