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
        clientName: `client${i}`,
        phoneNum: `${i}${i}${i}-${i}${i}${i}${i}-${i}${i}${i}${i}`,
        carNum: `서울${i}${i} 가${i}${i}${i}${i}`
        , title: `review${i}`
        , content: `review${i}${i}`
        , grade: `${(i % 5) + 1}`
        , clients_id: `${i + 1}`
        , createUser: `review${i}${i}${i}`
        , createDate: new Date()
        , supplierusers_id: `${i + 1}`
        , clients_id: null
        , carinfo_id: `${i + 1}`
      }
      datas.push(obj)
    }

    await queryInterface.bulkInsert('review', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('review', null, {});
  }
};
