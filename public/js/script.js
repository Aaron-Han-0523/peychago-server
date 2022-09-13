function formatDate(d_t) {
    let year = d_t.getFullYear();
    let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
    let day = ("0" + d_t.getDate()).slice(-2);
    let hour = ("0" + d_t.getHours()).slice(-2);
    let minute = ("0" + d_t.getMinutes()).slice(-2);
    let seconds = ("0" + d_t.getSeconds()).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
}

function cancel() {
    let chk = confirm("취소하시겠습니까?");
    if (chk) {
        history.back();
    }
}

function del_bbs(id) {
    let chk = confirm("정말로 삭제하시겠습니까?");
    if (chk) {
        // console.log(id)
        fetch('/delete/' + id)
            .then(res => {
                if (res.ok) {
                    alert("삭제되었습니다.");
                    history.back();
                    location.href = document.referrer;
                } else {
                    alert(res.statusText);
                }
            })
    }
}

/**
* 엑셀 다운로드
* @param fileName 엑셀파일명 (ex. excel.xls)
* @param sheetName 시트명
* @param headers 시트내용(html - table)
*/
function _excelDown(fileName, sheetName, sheetHtml) {
    var html = '';
    html += '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    html += '    <head>';
    html += '        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    html += '        <xml>';
    html += '            <x:ExcelWorkbook>';
    html += '                <x:ExcelWorksheets>';
    html += '                    <x:ExcelWorksheet>'
    html += '                        <x:Name>' + sheetName + '</x:Name>';   // 시트이름
    html += '                        <x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions>';
    html += '                    </x:ExcelWorksheet>';
    html += '                </x:ExcelWorksheets>';
    html += '            </x:ExcelWorkbook>';
    html += '        </xml>';
    html += '    </head>';
    html += '    <body>';
    
    // ----------------- 시트 내용 부분 -----------------
    html += sheetHtml;
    // ----------------- //시트 내용 부분 -----------------
    
    html += '    </body>';
    html += '</html>';

    console.log(html)
    // 데이터 타입
    var data_type = 'data:application/vnd.ms-excel';
    var ua = window.navigator.userAgent;
    var blob = new Blob([html], {type: "application/csv;charset=utf-8;"});
    
    if ((ua.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) && window.navigator.msSaveBlob) {
        // ie이고 msSaveBlob 기능을 지원하는 경우
        navigator.msSaveBlob(blob, fileName);
    } else {
        // ie가 아닌 경우 (바로 다운이 되지 않기 때문에 클릭 버튼을 만들어 클릭을 임의로 수행하도록 처리)
        var anchor = window.document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        
        // 클릭(다운) 후 요소 제거
        document.body.removeChild(anchor);
    }
}

function exportExcel(title){ 
    // step 1. workbook 생성
    var wb = XLSX.utils.book_new();
  
    // step 2. 시트 만들기 
    var newWorksheet = excelHandler.getWorksheet(title);
  
    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
  
    // step 4. 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
  
    // step 5. 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
  }
  
  var excelHandler = {
      getExcelFileName : function(){
          return 'table-test.xlsx';	//파일명
      },
      getSheetName : function(){
          return 'Table Test Sheet';	//시트명
      },
      getExcelData : function(title){
          return document.getElementById(title); 	//TABLE id
      },
      getWorksheet : function(title){
          return XLSX.utils.table_to_sheet(this.getExcelData(title));
      }
  }
  
  function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
  }