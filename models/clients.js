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
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "비밀번호"
    },
    carNum: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "차량번호"
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "실거주지"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "이메일"
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
    ]
  });
};
