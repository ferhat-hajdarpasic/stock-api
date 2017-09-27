var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })

nightmare
  .goto('http://www.asx.com.au/asx/markets/equityPrices.do?by=asxCodes&asxCodes=NAB')
  //.type('form[action*="/search"] [name=p]', 'github nightmare')
  //.click('form[action*="/search"] [type=submit]')
  .wait('#content')
  .evaluate(function () {
    //return document.querySelector('header div a').href
    return document.querySelector('td.last').innerHTML
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });