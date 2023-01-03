const crypto = require("crypto");
const myUtils = require("../utils/myUtils");

exports.test = (req, res, next) => {
  const insttCode = process.env.insttCode;
  let timeStamp = myUtils.simpleFormatDateTime(new Date());

  let preHashValue = insttCode + timeStamp + process.env.TS_API_SECRET_KEY;

  const hashValue = crypto
    .createHash("sha256")
    .update(preHashValue)
    .digest("hex");
  // console.log(hashValue);

  const fixedMap = {
    hashValue: hashValue,
    timeStamp: timeStamp,
    svcCodeArr: process.env.svcCodeArr,
    svcType: "N", // 고정방식 Y / 비고정방식 N
    returnURLA: "http://52.78.243.91/apiProvide/returnURLA",
    returnURLD: "http://52.78.243.91/apiProvide/returnURLD",
    // carOwner: "김희준",
    // carRegNo: "30로2083",
    siteURL: "www.geotwo.com",
    siteName: "지오투 홈페이지",
  };

  return res.render("api/test_ts_api", { fixedMap: fixedMap });
};
