var DataTypes = require("sequelize").DataTypes;
var _carinfo = require("./carinfo");
var _clientlog = require("./clientlog");
var _clients = require("./clients");
var _disposalrequest = require("./disposalrequest");
var _estimationslist = require("./estimationslist");
var _exportrequest = require("./exportrequest");
var _imagesetting = require("./imagesetting");
var _notice = require("./notice");
var _parts = require("./parts");
var _partslist = require("./partslist");
var _process = require("./process");
var _review = require("./review");
var _supplieruserlog = require("./supplieruserlog");
var _supplierusers = require("./supplierusers");
var _userlog = require("./userlog");
var _users = require("./users");

function initModels(sequelize) {
  var carinfo = _carinfo(sequelize, DataTypes);
  var clientlog = _clientlog(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var disposalrequest = _disposalrequest(sequelize, DataTypes);
  var estimationslist = _estimationslist(sequelize, DataTypes);
  var exportrequest = _exportrequest(sequelize, DataTypes);
  var imagesetting = _imagesetting(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var parts = _parts(sequelize, DataTypes);
  var partslist = _partslist(sequelize, DataTypes);
  var process = _process(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var supplieruserlog = _supplieruserlog(sequelize, DataTypes);
  var supplierusers = _supplierusers(sequelize, DataTypes);
  var userlog = _userlog(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  carinfo.belongsToMany(parts, { as: 'parts_id_parts', through: partslist, foreignKey: "carInfo_id", otherKey: "parts_id" });
  parts.belongsToMany(carinfo, { as: 'carInfo_id_carinfos', through: partslist, foreignKey: "parts_id", otherKey: "carInfo_id" });
  partslist.belongsTo(carinfo, { as: "carInfo", foreignKey: "carInfo_id"});
  carinfo.hasMany(partslist, { as: "partslists", foreignKey: "carInfo_id"});
  review.belongsTo(carinfo, { as: "carInfo", foreignKey: "carInfo_id"});
  carinfo.hasMany(review, { as: "reviews", foreignKey: "carInfo_id"});
  review.belongsTo(clients, { as: "client", foreignKey: "clients_id"});
  clients.hasMany(review, { as: "reviews", foreignKey: "clients_id"});
  partslist.belongsTo(parts, { as: "part", foreignKey: "parts_id"});
  parts.hasMany(partslist, { as: "partslists", foreignKey: "parts_id"});
  review.belongsTo(supplierusers, { as: "supplierUser", foreignKey: "supplierUsers_id"});
  supplierusers.hasMany(review, { as: "reviews", foreignKey: "supplierUsers_id"});
  supplieruserlog.belongsTo(supplierusers, { as: "supplierUser", foreignKey: "supplierUsers_id"});
  supplierusers.hasMany(supplieruserlog, { as: "supplieruserlogs", foreignKey: "supplierUsers_id"});
  userlog.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(userlog, { as: "userlogs", foreignKey: "users_id"});

  return {
    carinfo,
    clientlog,
    clients,
    disposalrequest,
    estimationslist,
    exportrequest,
    imagesetting,
    notice,
    parts,
    partslist,
    process,
    review,
    supplieruserlog,
    supplierusers,
    userlog,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
