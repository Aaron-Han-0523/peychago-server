const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('process', {
    process_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "진행 상황 식별번호"
    },
    clients_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "고객 식별번호",
      references: {
        model: 'clients',
        key: 'clients_id'
      }
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "진행단계"
    },
    date0: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "신청일"
    },
    date1: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "접수일"
    },
    date2: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "status2 date"
    },
    date3: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "status3 date"
    },
    date4: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "status4 date"
    },
    date5: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "status5 date"
    },
    date6: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "status6 date"
    },
    date7: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "status7 date"
    },
    supplierRequest_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "회수요청 식별번호"
    }
  }, {
    sequelize,
    tableName: 'process',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "process_id" },
          { name: "clients_id" },
        ]
      },
      {
        name: "Process_FK",
        using: "BTREE",
        fields: [
          { name: "clients_id" },
        ]
      },
    ]
  });
};
