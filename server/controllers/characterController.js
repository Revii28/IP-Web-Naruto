const { Character, User, Village } = require("../models");

module.exports = {
  async createCharacter(req, res, next) {
    const { name, abilities, status, background, userId, villageId } = req.body;
    try {
      const data = await Character.create({
        name,
        abilities,
        status,
        background,
        userId,
        villageId,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  },

  async getCharacters(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await Character.findAndCountAll({
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Village,
          },
        ],
        offset,
        limit,
      });

      if (rows.length === 0) {
        return res.status(404).json({ message: "No characters found." });
      }

      res.status(200).json({
        totalCharacters: count,
        totalPages: Math.ceil(count / limit),
        page: Number(page),
        characters: rows,
      });
    } catch (err) {
      next(err);
    }
  },

  async getCharacterById(req, res, next) {
    const id = req.params.id;
    try {
      const character = await Character.findByPk(id, {
        include: [User, Village],
      });
      if (!character) {
        throw { name: "Character not found.", id: id };
      }
      res.status(200).json(character);
    } catch (err) {
      next(err);
    }
  },

  async updateCharacterById(req, res, next) {
    const { name, abilities, status, background, userId, villageId } = req.body;
    const id = req.params.id;
    try {
      const character = await Character.findByPk(id);
      if (!character) {
        throw { name: "Character not found.", id: id };
      }
      await character.update({
        name,
        abilities,
        status,
        background,
        userId,
        villageId,
      });
      res.status(200).json({ message: `Character id ${id} updated.` });
    } catch (err) {
      next(err);
    }
  },

  async deleteCharacterById(req, res, next) {
    const id = req.params.id;
    try {
      const character = await Character.findByPk(id);
      if (!character) {
        throw { name: "Character not found." };
      }
      await Character.destroy({ where: { id: id } });
      res.status(200).json({ message: `Character id ${id} deleted.` });
    } catch (err) {
      next(err);
    }
  },

  async searchCharactersByName(req, res, next) {
    const { name } = req.query;
    try {
      const characters = await Character.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: [User, Village],
      });
      res.status(200).json(characters);
    } catch (err) {
      next(err);
    }
  },
};
