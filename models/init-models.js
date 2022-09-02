var DataTypes = require("sequelize").DataTypes;
var _carinfo = require("./carinfo");
var _clientlog = require("./clientlog");
var _clients = require("./clients");
var _disposalrequest = require("./disposalrequest");
var _exportrequest = require("./exportrequest");
var _imagesetting = require("./imagesetting");
var _material = require("./material");
var _notice = require("./notice");
var _process = require("./process");
var _review = require("./review");
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
  var material = _material(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var process = _process(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var supplierrequest = _supplierrequest(sequelize, DataTypes);
  var supplieruserlog = _supplieruserlog(sequelize, DataTypes);
  var supplierusers = _supplierusers(sequelize, DataTypes);
  var userlog = _userlog(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    carinfo,
    clientlog,
    clients,
    disposalrequest,
    exportrequest,
    imagesetting,
    material,
    notice,
    process,
    review,
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
