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
        title:`noticetitle${i}`,
        content:`noticecontent${i}`,
        type:`${parseInt(i%2)}`,
        createUser:`notice${i}`
        ,createDate: new Date(),
      }
      datas.push(obj)
    }

    await queryInterface.bulkInsert('notice', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('notice', null, {});
  }
};
