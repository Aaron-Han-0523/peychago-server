const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parts', {
    parts_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "부자재 식별번호"
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "부품명"
    },
    unit: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "단위"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "가격"
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "메모"
    },
    createUser: {
      type: DataTypes.CHAR(15),
      allowNull: true,
      comment: "생성자"
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'parts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parts_id" },
        ]
      },
    ]
  });
};
