'use strict';

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
    let admin = {
      users_id: 0,
      userid: "admin",
      password: "admin",
      userName: "admin",
      phone: "000-0000-0000",
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
