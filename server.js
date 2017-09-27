"use strict";
var page = require('webpage').create();
var server = require('webserver').create();
var system = require('system'),
t, ticker;

function parseGET(url) {
    // adapted from http://stackoverflow.com/a/8486188
    var query = url.substr(url.indexOf("?")+1);
    var result = {};
    query.split("&").forEach(function(part) {
      var e = part.indexOf("=")
      var key = part.substr(0, e);
      var value = part.substr(e+1);
      result[key] = decodeURIComponent(value);
    });
    return result;
  };

var host, port;

if (system.args.length !== 2) {
    console.log('Usage: server.js <some port>');
    phantom.exit(1);
} else {
    port = system.args[1];
    var listening = server.listen(port, function (request, response) {
        console.log("GOT HTTP REQUEST");
       
        var args = parseGET(request.url);

        var ticker = args.ticker;
        var parsePriceFunction = function (status) {
            if (status !== 'success') {
                console.log('FAIL to load the price of ' + ticker + ' (' + status + ')');
            } else {
                t = Date.now() - t;
                console.log('Loading time ' + t + ' msec');
                window.setTimeout(function() {
                    var price = page.evaluate(function() {
                        return document.querySelector('td.last').innerHTML.trim();
                    });
                    console.log(price);
                    response.statusCode = 200;
                    response.headers = {"Cache": "no-cache", "Content-Type": "application/json"};
                    var result = {
                        price: price,
                        options: [{

                        }]
                    };
                    response.write(JSON.stringify(result));
                    response.close();
                        }, 5000);
            }
        };
        
        var url = 'http://www.asx.com.au/asx/markets/equityPrices.do?by=asxCodes&asxCodes=' + ticker;
        t = Date.now();
        page.open(url, parsePriceFunction);
    });
    if (!listening) {
        console.log("could not create web server listening on port " + port);
        phantom.exit();
    }
    var url = "Send requests to 'http://localhost:" + port + "?ticker=NAB'";
    console.log(url);
}
