"use strict";
const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    
    const villages = require("../Database/Village.json");
    const { data } = await axios.get("https://narutodb.xyz/api/character", {
      params: {
        page: 1,
        limit: 1431,
      },
    });
    let id = 1;
    const apiCharacters = data.characters.map((chara) => {
      let background =
        typeof chara?.personal?.affiliation == "string"
          ? chara?.personal?.affiliation
          : Array.isArray(chara?.personal?.affiliation)
          ? chara?.personal?.affiliation[0]
          : "-";

      let villageId =
        (chara?.personal?.affiliation &&
          villages.find((e) => e.name == chara?.personal?.affiliation)?.id) ||
        null;

      if (background.length > 255) background = "-";
      return {
        id: ++id,
        imageUrl: chara?.images[0] || "",
        name: chara?.name,
        abilities: chara?.jutsu?.join(", ") || "No Jutsu",
        status: chara?.personal?.status,
        background,
        userId: null,
        villageId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const characters = require("../Database/Characters.json").map((e) => ({
      ...e,
      id: ++id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert(
      "Characters",
      [...apiCharacters, ...characters],
      {}
    );
    await queryInterface.sequelize.query(
      `SELECT setval('"Characters_id_seq"', (SELECT MAX(id) FROM "Characters"))`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Characters", null, {});
  },
};
