'use strict';
const villageData = require('../Database/Village.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const villages = villageData.map(village => ({
      ...village,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Villages', villages, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Villages', null, {});
  }
};
