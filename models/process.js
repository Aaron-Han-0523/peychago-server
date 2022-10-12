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
      comment: "폐차(0)\/수출(1)"
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
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
    registerDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "최초등록일"
    },
    carCondition: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "차량상태(양호\/사고\/운행불가)"
    },
    aluminumWheel: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "알루미늄 휠"
    },
    attachment: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "압류"
    },
    mortgage: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "저당"
    },
    carImagePath0: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "차량사진0"
    },
    carImagePath1: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "차량사진1"
    },
    carImagePath2: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "차량사진2"
    },
    carImagePath3: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "차량사진3"
    },
    estimation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "가견적"
    },
    exportable: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
      comment: "수출가능여부"
    },
    quotation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "실견적"
    },
    requestPath: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "회수요청서 경로"
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
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "비고"
    },
    createUser: {
      type: DataTypes.STRING(15),
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
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "수정자"
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정일"
    },
    deleteUser: {
      type: DataTypes.STRING(15),
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
