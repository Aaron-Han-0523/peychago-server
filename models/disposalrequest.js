const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disposalrequest', {
    disposalRequest_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "폐차 견적 식별번호"
    },
    supplierUsers_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "협력사 식별번호"
    },
    commission: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "수수료"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "차대비"
    },
    loss: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "손실금"
    },
    deliveryFee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "탁송료"
    },
    carNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "차량번호"
    },
    ownerName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: "차주 성함"
    },
    model: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차량명, 차종"
    },
    yearModel: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "연식"
    },
    engineCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "원동기 형식"
    },
    displacement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "배기량"
    },
    mortgage: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "압류\/저당"
    },
    carCondition: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "차량상태"
    },
    aluminumWheel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "알루미늄 휠"
    },
    collectMethod: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "견인\/조기\/인탁"
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "회수일시"
    },
    collectPlace: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "회수장소"
    },
    phoneNum: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: "회수연락처"
    },
    bankName1: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차주-은행명"
    },
    accountNum1: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차주-계좌번호"
    },
    accountHolder1: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차주-예금주"
    },
    amount1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "차주-금액"
    },
    bankName2: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "입금-은행명"
    },
    accountNum2: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "입금-계좌번호"
    },
    accountHolder2: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "입금-예금주"
    },
    amount2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "입금-금액"
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
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
    tableName: 'disposalrequest',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "disposalRequest_id" },
        ]
      },
    ]
  });
};
