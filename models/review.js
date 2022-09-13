const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review', {
    review_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "후기 식별번호"
    },
    carNum: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "차량번호"
    },
    phoneNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "전화번호"
    },
    clientName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "소유자명"
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
    grade: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "별점"
    },
    attachedFilepath1: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "첨부파일1 경로"
    },
    attachedFilepath2: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "첨부파일2 경로"
    },
    attachedFilepath3: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "첨부파일3 경로"
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
    },
    clients_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "고객 식별번호",
      references: {
        model: 'clients',
        key: 'clients_id'
      }
    },
    carInfo_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "차량 정보 식별번호",
      references: {
        model: 'carinfo',
        key: 'carInfo_id'
      }
    },
    supplierUsers_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "협력사 식별번호",
      references: {
        model: 'supplierusers',
        key: 'supplierUsers_id'
      }
    }
  }, {
    sequelize,
    tableName: 'review',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "review_id" },
        ]
      },
      {
        name: "Review_FK2",
        using: "BTREE",
        fields: [
          { name: "carInfo_id" },
        ]
      },
      {
        name: "Review_FK1",
        using: "BTREE",
        fields: [
          { name: "clients_id" },
        ]
      },
      {
        name: "Review_FK",
        using: "BTREE",
        fields: [
          { name: "supplierUsers_id" },
        ]
      },
    ]
  });
};
