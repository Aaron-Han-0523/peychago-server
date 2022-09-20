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

    let obj = {
      clients_id: 1
      , clientName: '홍길동'
      , phoneNum: '010-0000-0000'
      , password: '접근불가'
      , carNum: '율도국0000'
      , carInfo_id: 1
      , createDate: new Date(),
    }

    await queryInterface.bulkInsert('clients', [obj], {});
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
