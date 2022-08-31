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
    let datas = [];

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
    datas.push(admin);

    let test = {
      userid: "test",
      password: "test1",
      userName: "test2",
      phone: "111-1111-1111",
      email: "test3@example.com",
      permission1: 0b0000,
      permission2: 0b0000,
      permission3: 0b0000,
      permission4: 0b0000,
      permission5: 0b0000,
      permission6: 0b0000,
      permission7: 0b0000,
      createUser: "admin",
      createDate: new Date(),
    }
    datas.push(test);


    return queryInterface.bulkInsert('users', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});

  }
};
