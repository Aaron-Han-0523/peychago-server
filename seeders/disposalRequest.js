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
        let now = new Date();

        let datas = [];
        for (let i = 0; i < 10; i++) {
            let obj = {
                carNum: `서울 ${i}${i} 가 ${i}${i}${i}${i}`
                , phoneNum: `010-${i}${i}${i}${i}-${i}${i}${i}${i}`
                , model: `${i}car${i}`
                , yearModel: `200${i}`
                , ownerName: `testclient${i}`
                , engineCode: `engin${i}`
                , displacement: `${i + 1}${i}${i}`
                , deliveryDate: new Date(2022, 10, i)
                , collectPlace: '논현' + i
                , phoneNum: `010-${i}${i}${i}${i}-${i}${i}${i}${i}`
                , bankName1: `우리은행`
                , accountNum1: `${i}${i}${i}-${i}${i}-${i}${i}${i}${i}${i}${i}`
                , accountHolder1: `testclient${i}`
                , amount1: (i + 1) + '00000'
                , createUser: `supplierReq${i}`
                , createDate: new Date(2022, 9, i)
            }
            datas.push(obj)
        }

        await queryInterface.bulkInsert('disposalRequest', datas, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('disposalRequest', null, {});
    }
};
