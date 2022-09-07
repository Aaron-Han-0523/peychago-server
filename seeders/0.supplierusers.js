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
        companyName: `suppliers${i}`
        , mainPhoneNum: `02-${i}${i}${i}-${i}${i}${i}${i}`
        , password: "123456"
        , address: `supplierusers${i}${i}${i}`
        , companyNumber: `${i}${i}${i}-${i}${i}-${i}${i}${i}${i}${i}`
        , ownerName: `users${i}`
        , phoneNum: `010-${i}${i}${i}${i}-${i}${i}${i}${i}`
        , email: `supplierusers${i}@example.com`
        , createUser: `S_user${i}`
        , createDate: new Date(),
      }
      datas.push(obj)
    }

    await queryInterface.bulkInsert('supplierusers', datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('supplierusers', null, {});
  }
};
