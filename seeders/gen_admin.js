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

    let password = await encryption
      .hashing('admin')
      .then(result => {
        // console.log(result);
        return result;
      })
      .catch(err => console.error(err));

    // console.log(password.length)

    let admin = {
      userid: "admin",
      password: password,
      userName: "관리자",
      phoneNum: "000-0000-0000",
      email: "admin@page.com",
      permission1: 0b1111,
      permission2: 0b1111,
      permission3: 0b1111,
      permission4: 0b1111,
      permission5: 0b1111,
      permission6: 0b1111,
      permission7: 0b1111,
      createUser: "admin",
      createDate: new Date(),
    }

    await queryInterface.bulkInsert('users', [admin], {});
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
