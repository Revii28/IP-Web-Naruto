'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const userData = require('../Database/User.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = userData.map(user => ({
      ...user,
      password: hashPassword(user.password),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
