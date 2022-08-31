const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notice', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "공지사항 식별번호"
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "제목"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "내용"
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "타입 top\/bottom\/norma"
    },
    link: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "공지사항 링크"
    },
    createUser: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      comment: "생성자"
    },
    updateUser: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "수정자"
    },
    createDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "생성일"
    },
    updateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "수정일"
    },
    deleteDate: {
      type: DataTypes.DATEONLY,
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
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "사용자 식별번호"
    }
  }, {
    sequelize,
    tableName: 'notice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
