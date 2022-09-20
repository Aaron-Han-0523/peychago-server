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
      imagesetting_id: 1
      , noticeImagePath: ''
      , about1Title: ''
      , about1URL: ''
      , about2Title: ''
      , about2ImagePath: ''
      , privacyImagePath: ''
      , termOfServicePath: ''
      , exportNoticePath: ''
      , exportPicturePath: ''
      , custom1: ''
      , custom2: ''
      , custom3: ''
    }

    await queryInterface.bulkInsert('imagesetting', [imageSetting], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('imagesetting', null, {});

  }
};
