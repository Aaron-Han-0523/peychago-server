const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplieruserlog', {
    supplierUsers_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "협력사 식별번호",
      references: {
        model: 'supplierusers',
        key: 'supplierUsers_id'
      }
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일"
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
    tableName: 'supplieruserlog',
    timestamps: false,
    indexes: [
      {
        name: "SupplierUserLog_FK",
        using: "BTREE",
        fields: [
          { name: "supplierUsers_id" },
        ]
      },
    ]
  });
};
