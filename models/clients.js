const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    clients_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "고객 식별번호"
    },
    clientName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "고객명"
    },
    phoneNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "연락처"
    },
    carNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "차량번호"
    },
    carInfo_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "차량 정보 식별번호",
      references: {
        model: 'carinfo',
        key: 'carInfo_id'
      }
    },
    supplierUsers_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "협력사 식별번호",
      references: {
        model: 'supplierusers',
        key: 'supplierUsers_id'
      }
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정일"
    },
    custom1: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "예비1"
    },
    custom2: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "예비2"
    },
    custom3: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "예비3"
    }
  }, {
    sequelize,
    tableName: 'clients',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clients_id" },
        ]
      },
      {
        name: "Clients_FK1",
        using: "BTREE",
        fields: [
          { name: "carInfo_id" },
        ]
      },
      {
        name: "Clients_FK",
        using: "BTREE",
        fields: [
          { name: "supplierUsers_id" },
        ]
      },
    ]
  });
};
