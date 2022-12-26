const codezip = {};

codezip.carCondition = ["양호", "사고", "운행불가"];
codezip.aluminumWheel = ["X", "O", "모름"];
codezip.collectMethod = ["견인", "조기", "인탁"];
codezip.disposalStateCode2Text = [
  "정보입력중",
  "정보입력완료",
  "가견적 확인중",
  "견적확인완료",
  "차량 인수중",
  "차량상태확인중",
  "실견적 확인중",
  "폐차 진행 승인",
  "폐차 진행중",
  "폐차 완료",
];
codezip.exportStateCode2Text = [
  "정보입력중",
  "정보입력완료",
  "가견적 확인중",
  "견적확인완료",
  "차량 인수중",
  "차량상태확인중",
  "실견적 확인중",
  "수출 계약 작성 중",
  "차량 말소 중",
  "수출 완료",
];

module.exports = codezip;
