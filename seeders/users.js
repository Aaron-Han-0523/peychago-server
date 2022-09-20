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
    let hashedPassword = await encryption.hashing("123456");

    let datas = [];
    for (let i = 0; i < 10; i++) {
      let obj = {
        userid: `testid${i}`,
        password: hashedPassword,
        userName: `testname${i}`,
        phoneNum: `${i}${i}${i}-${i}${i}${i}${i}-${i}${i}${i}${i}`,
        email: `test${i}@example.com`,
        permission1: 0b0000 | i,
        permission2: 0b0000 | i,
        permission3: 0b0000 | i,
        permission4: 0b0000 | i,
        permission5: 0b0000 | i,
        permission6: 0b0000 | i,
        permission7: 0b0000 | i,
        createUser: "admin",
        createDate: new Date(),
      }
      datas.push(obj)
    }

    await queryInterface.bulkInsert('users', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
