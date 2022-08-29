const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "사용자 id"
    },
    userid: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "사용자 userid",
      unique: "userid_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "비밀번호"
    },
    phone: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      comment: "전화번호"
    },
    email: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      comment: "이메일 주소"
    },
    permission1: {
      type: "BIT(4)",
      allowNull: false,
      defaultValue: "b'0'",
      comment: "공지사항 권한"
    },
    permission2: {
      type: "BIT(4)",
      allowNull: false,
      defaultValue: "b'0'",
      comment: "후기 권한"
    },
    permission3: {
      type: "BIT(4)",
      allowNull: false,
      defaultValue: "b'0'",
      comment: "입금 내역 권한"
    },
    permission4: {
      type: "BIT(4)",
      allowNull: false,
      defaultValue: "b'0'",
      comment: "이미지 세팅 권한"
    },
    permission5: {
      type: "BIT(4)",
      allowNull: false,
      defaultValue: "b'0'",
      comment: "차량 정보 권한"
    },
    permission6: {
      type: "BIT(4)",
      allowNull: false,
      defaultValue: "b'0'",
      comment: "부자재 권한"
    },
    permission7: {
      type: "BIT(4)",
      allowNull: false,
      defaultValue: "b'0'",
      comment: "폐차 파트너 권한"
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
      comment: "메모"
    },
    createUser: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      comment: "생성자"
    },
    updateUser: {
      type: DataTypes.CHAR(25),
      allowNull: true,
      defaultValue: "",
      comment: "수정자"
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
    deleteDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "삭제일"
    },
    custom1: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "예비"
    },
    custom2: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "예비"
    },
    custom3: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "예비"
    }
  }, {
    sequelize,
    tableName: 'users',
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
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "userid_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
