const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disposalquotation', {
    carNum: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "차량번호"
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
      allowNull: false,
      comment: "차량상태(양호\/사고\/운행불가)"
    },
    aluminumWheel: {
      type: DataTypes.TINYINT,
      allowNull: false,
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "견적가"
    },
    createUser: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "생성자"
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'disposalquotation',
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
