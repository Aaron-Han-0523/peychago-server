const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('process', {
    carNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      comment: "차량번호"
    },
    processType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "폐차(1)\/수출(2)"
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "진행단계"
    },
    clients_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "고객 식별번호"
    },
    carInfo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "차량 정보 식별번호"
    },
    ownerName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: "차주 성함"
    },
    model: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차종"
    },
    detailModel: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "세부모델"
    },
    displacement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "배기량"
    },
    yearModel: {
      type: DataTypes.STRING(4),
      allowNull: false,
      comment: "연식"
    },
    requestPath: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "회수요청서 경로"
    },
    estimationPath: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "실견적 경로"
    },
    deregistrationPath: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "말소증 경로"
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
          { name: "carNum" },
        ]
      },
    ]
  });
};
