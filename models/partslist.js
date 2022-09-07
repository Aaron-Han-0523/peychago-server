const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('partslist', {
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
    parts_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "부자재 식별번호",
      references: {
        model: 'parts',
        key: 'parts_id'
      }
    },
    parts_cnt: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
      comment: "부자재 별 갯수"
    }
  }, {
    sequelize,
    tableName: 'partslist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "carInfo_id" },
          { name: "parts_id" },
        ]
      },
      {
        name: "PartsList_FK1",
        using: "BTREE",
        fields: [
          { name: "parts_id" },
        ]
      },
    ]
  });
};
