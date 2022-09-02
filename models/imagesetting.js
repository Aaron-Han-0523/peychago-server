const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagesetting', {
    imagesetting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "이미지세팅 식별번호"
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
      {
        name: "ImageSetting_PK",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "imagesetting_id" },
        ]
      },
    ]
  });
};
