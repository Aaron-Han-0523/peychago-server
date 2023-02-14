const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carinfo', {
    carInfo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "차량 정보 식별번호"
    },
    maker: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차량브랜드명"
    },
    model: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      comment: "차명"
    },
    detailModel: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "원동기형식"
    },
    displacement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "배기량"
    },
    yearModel: {
      type: DataTypes.STRING(4),
      allowNull: false,
      comment: "연식모델"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "가격"
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "노트"
    },
    createUser: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      comment: "생성자"
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
    },
    updateUser: {
      type: DataTypes.CHAR(15),
      allowNull: true,
      defaultValue: "",
      comment: "수정자"
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정일"
    },
    deleteUser: {
      type: DataTypes.CHAR(15),
      allowNull: true,
      comment: "삭제자"
    },
    deleteDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "삭제일"
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
    tableName: 'carinfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "carInfo_id" },
        ]
      },
    ]
  });
};
