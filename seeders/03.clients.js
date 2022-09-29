'use strict';

require('dotenv').config();
const encryption = require('../utils/encryption');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let hashedPassword = await encryption.hashing("1234");

    let data = []
    for (let i = 0; i < 10; i++) {
      let obj = {
        clientName: 'cli' + i
        , phoneNum: `010-${i}${i}${i}${i}-${i}${i}${i}${i}`
        , password: hashedPassword
        , address: '학동' + i
        , createDate: new Date(),
      }
      data.push(obj)
    }
    // console.log(data)
    await queryInterface.bulkInsert('clients', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('clients', null, {});
  }
};
