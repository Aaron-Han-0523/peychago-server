const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subsidiarylist', {
    carInfo_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "차량 정보 식별번호",
      references: {
        model: 'carinfo',
        key: 'carInfo_id'
      }
    },
    Subsidiary_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "부자재 식별번호",
      references: {
        model: 'subsidiary',
        key: 'Subsidiary_id'
      }
    },
    subsidiaryId_cnt: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: "부자재 별 갯수"
    }
  }, {
    sequelize,
    tableName: 'subsidiarylist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "carInfo_id" },
          { name: "Subsidiary_id" },
        ]
      },
      {
        name: "SubsidiaryList_FK1",
        using: "BTREE",
        fields: [
          { name: "Subsidiary_id" },
        ]
      },
    ]
  });
};
