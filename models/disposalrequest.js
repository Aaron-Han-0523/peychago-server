const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disposalrequest', {
    disposalRequest_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "폐차 견적 식별번호"
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "신청\/진행\/종료\/보류"
    },
    enrollDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "접수일"
    },
    carNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "차량번호"
    },
    phoneNum: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: "전화번호"
    },
    carName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차량명, 차종"
    },
    yearModel: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "연식"
    },
    engineCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "원동기 형식"
    },
    displacement: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "배기량"
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "인수일"
    },
    disposalDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "폐차일"
    },
    payDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "입금일"
    },
    payPrice: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "폐차금액"
    },
    manager: {
      type: DataTypes.STRING(25),
      allowNull: true,
      comment: "담당자"
    },
    supplierRequest_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "회수요청 식별번호"
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
    tableName: 'disposalrequest',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "disposalRequest_id" },
        ]
      },
    ]
  });
};
