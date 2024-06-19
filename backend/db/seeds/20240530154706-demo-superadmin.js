'use strict';
const { encryptPassword } = require('../seederEncryptedPassword'); 

module.exports = {
  async up (queryInterface, Sequelize) {
    const encryptedPassword = await encryptPassword('superadmin1');
    return queryInterface.bulkInsert('Users', [
      {
        email: 'superadmin1@example.com',
        encryptedPassword:encryptedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'superadmin'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
