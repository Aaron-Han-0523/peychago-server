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
    for (let i = 0; i < 10; i++) {
      let obj = {
        maker: `carinfo${i}`
        , model: `carinfo${i}${i}`
        , detailModel: `carinfo${i}${i}${i}`
        , yearModel: `carinfo${i}${i}${i}${i}`
        , createUser: `carinfo${i}${i}${i}${i}${i}`
        , createDate: new Date()
      }
      datas.push(obj)
    }

    await queryInterface.bulkInsert('carinfo', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('carinfo', null, {});
  }
};
