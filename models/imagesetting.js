const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagesetting', {
    imagesetting_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "이미지세팅 식별번호"
    },
    noticeImage: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "공지사항 이미지 경로"
    },
    about1Title: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "어바웃1 제목"
    },
    about1URL: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "어바웃1 링크"
    },
    about2Title: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "어바웃2 제목"
    },
    about2ImagePath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "어바웃2 이미지 경로"
    },
    privacyImagePath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "개인정보보호법 이미지 경로"
    },
    termOfServicePath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "이용약관 이미지 경로"
    },
    exportNoticePath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "수출관리 공지 이미지 경로"
    },
    exportPicturePath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "수출관리 사진 샘플 이미지 경로"
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
    tableName: 'imagesetting',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "imagesetting_id" },
        ]
      },
    ]
  });
};
