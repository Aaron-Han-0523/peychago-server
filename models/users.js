const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    users_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "사용자 식별번호"
    },
    userid: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "아이디",
      unique: "Users_UK"
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "비밀번호"
    },
    userName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "이름"
    },
    phoneNum: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      comment: "연락처"
    },
    email: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      comment: "이메일"
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
      type: DataTypes.CHAR(15),
      allowNull: false,
      comment: "생성자"
    },
    updateUser: {
      type: DataTypes.CHAR(15),
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
      comment: "custom1"
    },
    custom2: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "custom2"
    },
    custom3: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "custom3"
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
          { name: "users_id" },
        ]
      },
      {
        name: "Users_UK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
