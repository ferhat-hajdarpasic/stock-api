var Nightmare = require('nightmare');
var nightmare = Nightmare({
  waitTimeout: 30000,
  openDevTools: {
    mode: 'attach'
  }, show: true })

  var query = function () {
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
  };

  var success = function (result) {
    console.log(JSON.stringify(result));
  };

  var failure = function (error) {
    console.error('Search failed:', error);
  };

  var scrape = function(ticker, success, failure) {
    var page = nightmare.goto(`http://www.asx.com.au/asx/markets/dividends.do?by=asxCodes&asxCodes=${ticker}&view=all`);
    page = page.wait(5000);
    page = page.wait('#dividends');
    page = page.evaluate(query);
    //page = page.end();
    page = page.then(success);
    page = page.catch(failure);  
  };


  scrape('NAB', success, failure);
  scrape('BHP', success, failure);
  
  
