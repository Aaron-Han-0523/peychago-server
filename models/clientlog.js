const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientlog', {
    clientlog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    custom1: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    custom2: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    custom3: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clientlog',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clientlog_id" },
        ]
      },
    ]
  });
};
