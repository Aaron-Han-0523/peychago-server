const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estimationslist', {
    clients_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "고객 식별번호"
    },
    supplierUsers_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "협력사 식별번호"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "견적 금액"
    }
  }, {
    sequelize,
    tableName: 'estimationslist',
    timestamps: false
  });
};
