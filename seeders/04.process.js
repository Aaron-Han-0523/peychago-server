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

    let data = []
    for (let i = 0; i < 10; i++) {
      let obj = {
        carNum: `${i}${i} 가 ${i}${i}${i}${i}`
        , state: i
        , clients_id: i + 1
        , ownerName: 'cli' + i
        , model: `${i}모델${i}`
        , detailModel: `engin${i}`
        , displacement: `${i + 1}${i}${i}`
        , yearModel: `200` + i
        , registerDate: `200${i}-${('0' + (i + 1)).slice(-2)}-${('0' + (i + 1)).slice(-2)}`
        , processType: i % 2
        , date0: new Date()
        , createUser: 'cli' + i
        , createDate: new Date()
      }
      data.push(obj);
    }
    await queryInterface.bulkInsert('process', data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('process', null, {});
  }
};
