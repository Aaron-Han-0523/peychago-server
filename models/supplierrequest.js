const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplierrequest', {
    supplierRequest_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "회수요청 식별번호"
    },
    state: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "신청\/진행\/종료\/보류"
    },
    enrollDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "접수일"
    },
    carNum: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "차량번호"
    },
    mortgage: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "저당, 압류"
    },
    contractNum: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "계약번호"
    },
    carName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "차량명, 차종"
    },
    yearModel: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "연식"
    },
    ownerName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: "차주명"
    },
    carCondition: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "차량상태 : 양호\/사고"
    },
    disposalType: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "폐차구분 : 일반\/조기\/압류\/상속"
    },
    collectMethod: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "회수방법 : 견인\/조기\/인탁"
    },
    aluminumWheel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "알루미늄 휠 (o , x)"
    },
    collectReqDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "회수요청일"
    },
    collectTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "회수시간"
    },
    collectPlace: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "회수장소"
    },
    newCar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "신차구매"
    },
    phoneNum: {
      type: DataTypes.STRING(25),
      allowNull: false,
      comment: "회수시 연락처"
    },
    collectArea: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "회수지역"
    },
    etc: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "기타사항"
    },
    supplierUsers_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "협력사 식별번호"
    },
    bankName1: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "차주-은행명"
    },
    accountNum1: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "차주-계좌번호"
    },
    accountHolder1: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "차주-예금주"
    },
    amount1: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    expungeDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "말소일"
    },
    disposalFeeYN: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "폐차비 입금 여부 : o\/x"
    },
    collectDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "회수일"
    },
    addSubsidyYN: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "추가 보조금 청구"
    },
    commissionDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수수료 입금일"
    },
    inspectionFeeYN: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "검사비 입금"
    },
    carRegistrationPath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "차량등록증"
    },
    bankbookPath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "통장사본"
    },
    idcard1Path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "신분증1"
    },
    idcard2Path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "신분증2"
    },
    certificate1Path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "폐차말소증"
    },
    certificate2Path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "폐차인수증"
    },
    depositHistoryPath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "압류입금내역"
    },
    certificate3Path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "신차등록증"
    },
    etc1Path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "기타1"
    },
    etc2Path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "기타2"
    },
    confirmationPath: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "지급대상확인서"
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
    tableName: 'supplierrequest',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "supplierRequest_id" },
        ]
      },
    ]
  });
};
