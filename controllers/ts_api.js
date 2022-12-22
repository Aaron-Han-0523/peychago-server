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
  console.log(hashValue);

  const fixedMap = {
    hashValue: hashValue,
    timeStamp: timeStamp,
    svcCodeArr: process.env.svcCodeArr,
    svcType: "Y", // 고정방식 Y / 비고정방식 N
    returnURLA: "https://14.35.194.170:8080/aio365/provide/returnURLA.do",
    returnURLD: "https://14.35.194.170:8080/aio365/provide/returnURLD.do",
    carOwner: "김무준",
    carRegNo: "30로2083",
    siteURL: "http://www.peachago.com/",
    siteName: "폐차GO",
  };

  return res.render("api/test_ts_api", { fixedMap: fixedMap });
};
