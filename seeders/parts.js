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
        name: `parts${i}`
        , unit: "EA"
        , price: `${i}0000`
        , createUser: `parts${i}${i}`
        , createDate: new Date(),
      }
      datas.push(obj)
    }

    await queryInterface.bulkInsert('parts', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('parts', null, {});
  }
};
