const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplierusers', {
    supplierUsers_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "협력사 식별번호"
    },
    companyName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "회사명"
    },
    mainPhoneNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "메인 전화번호(ID)",
      unique: "SupplierUsers_UK"
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "비밀번호"
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "업체 주소"
    },
    companyNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "사업자등록번호"
    },
    ownerName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "대표자명"
    },
    phoneNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "전화번호"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "이메일"
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "메모"
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
    tableName: 'supplierusers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "supplierUsers_id" },
        ]
      },
      {
        name: "SupplierUsers_UK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mainPhoneNum" },
        ]
      },
    ]
  });
};
