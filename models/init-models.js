var DataTypes = require("sequelize").DataTypes;
var _carinfo = require("./carinfo");
var _clientlog = require("./clientlog");
var _clients = require("./clients");
var _disposalrequest = require("./disposalrequest");
var _exportrequest = require("./exportrequest");
var _imagesetting = require("./imagesetting");
var _notice = require("./notice");
var _process = require("./process");
var _review = require("./review");
var _subsidiary = require("./subsidiary");
var _subsidiarylist = require("./subsidiarylist");
var _supplierrequest = require("./supplierrequest");
var _supplieruserlog = require("./supplieruserlog");
var _supplierusers = require("./supplierusers");
var _userlog = require("./userlog");
var _users = require("./users");

function initModels(sequelize) {
  var carinfo = _carinfo(sequelize, DataTypes);
  var clientlog = _clientlog(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var disposalrequest = _disposalrequest(sequelize, DataTypes);
  var exportrequest = _exportrequest(sequelize, DataTypes);
  var imagesetting = _imagesetting(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var process = _process(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var subsidiary = _subsidiary(sequelize, DataTypes);
  var subsidiarylist = _subsidiarylist(sequelize, DataTypes);
  var supplierrequest = _supplierrequest(sequelize, DataTypes);
  var supplieruserlog = _supplieruserlog(sequelize, DataTypes);
  var supplierusers = _supplierusers(sequelize, DataTypes);
  var userlog = _userlog(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  carinfo.belongsToMany(subsidiary, { as: 'Subsidiary_id_subsidiaries', through: subsidiarylist, foreignKey: "carInfo_id", otherKey: "Subsidiary_id" });
  subsidiary.belongsToMany(carinfo, { as: 'carInfo_id_carinfos', through: subsidiarylist, foreignKey: "Subsidiary_id", otherKey: "carInfo_id" });
  clients.belongsTo(carinfo, { as: "carInfo", foreignKey: "carInfo_id"});
  carinfo.hasMany(clients, { as: "clients", foreignKey: "carInfo_id"});
  review.belongsTo(carinfo, { as: "carInfo", foreignKey: "carInfo_id"});
  carinfo.hasMany(review, { as: "reviews", foreignKey: "carInfo_id"});
  subsidiarylist.belongsTo(carinfo, { as: "carInfo", foreignKey: "carInfo_id"});
  carinfo.hasMany(subsidiarylist, { as: "subsidiarylists", foreignKey: "carInfo_id"});
  clientlog.belongsTo(clients, { as: "client", foreignKey: "clients_id"});
  clients.hasMany(clientlog, { as: "clientlogs", foreignKey: "clients_id"});
  process.belongsTo(clients, { as: "client", foreignKey: "clients_id"});
  clients.hasMany(process, { as: "processes", foreignKey: "clients_id"});
  review.belongsTo(clients, { as: "client", foreignKey: "clients_id"});
  clients.hasMany(review, { as: "reviews", foreignKey: "clients_id"});
  subsidiarylist.belongsTo(subsidiary, { as: "Subsidiary", foreignKey: "Subsidiary_id"});
  subsidiary.hasMany(subsidiarylist, { as: "subsidiarylists", foreignKey: "Subsidiary_id"});
  clients.belongsTo(supplierusers, { as: "supplierUser", foreignKey: "supplierUsers_id"});
  supplierusers.hasMany(clients, { as: "clients", foreignKey: "supplierUsers_id"});
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
    exportrequest,
    imagesetting,
    notice,
    process,
    review,
    subsidiary,
    subsidiarylist,
    supplierrequest,
    supplieruserlog,
    supplierusers,
    userlog,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
