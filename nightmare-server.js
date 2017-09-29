var Nightmare = require('nightmare');
var nightmare = Nightmare({
    waitTimeout: 60000,
    openDevTools: {
      mode: 'detach'
    }, show: false })

  nightmare
  .goto('http://www.asx.com.au/asx/markets/dividends.do?by=asxCodes&asxCodes=NAB&view=all')
  .wait('#dividends')
  .evaluate(function () {
      console.log('In evaluate. Found the element!');
    var table = document.querySelector('table.datatable')
    var tr = table.querySelectorAll('tr')
    var table = [];
    for(i=1; i < tr.length; i++) {
        var td = tr[i].querySelectorAll('td');
        table.push({
            "DivAmount":td[1].textContent.trim(),
            "Ex Div Date":td[2].textContent.trim(),
            "Record Date":td[3].textContent.trim(),
            "Date Payable":td[4].textContent.trim(),
            "% Franked":td[5].textContent.trim(),
            "Type":td[6].textContent.trim(),
            "Further Information":td[7].textContent.trim()
        });
    }
    return table;
    //var dividends = transformToDividendObject(getDividendsTableData(rows));
  })
  .end()
  .then(function (result) {
    console.log(JSON.stringify(result));
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
  
  
