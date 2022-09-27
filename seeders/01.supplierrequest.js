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
        state: 0
        , enrollDate: new Date()
        , carNum: `서울 ${i}${i} 가 ${i}${i}${i}${i}`
        , phoneNum: `010-${i}${i}${i}${i}-${i}${i}${i}${i}`
        , model: `${i}car${i}`
        , yearModel: `${i}${i}${i}${i}`
        , ownerName: `testclient${i}`
        , supplierUsers_id: i
        , createUser: `supplierReq${i}`
        , createDate: new Date()
      }
      datas.push(obj)
    }

    await queryInterface.bulkInsert('supplierrequest', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('supplierrequest', null, {});
  }
};
