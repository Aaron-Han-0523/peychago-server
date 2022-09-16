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
    let imageSetting = {
      noticeImagePath: ''
      , about1Title: ''
      , about1URL: ''
      , about2Title: ''
      , about2ImagePath: ''
      , privacyImagePath: ''
      , termOfServicePath: ''
      , exportNoticePath: ''
      , exportPicturePath: ''
    }

    await queryInterface.bulkInsert('users', [imageSetting], {});
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
