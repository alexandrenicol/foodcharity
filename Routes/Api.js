
/* jshint node: true */
/* jshint loopfunc: true */
'use strict';

var _ = require('underscore');

class RouterApi {
  static init(app) { 

    app.get('/hello', function (req, res) {
      
      res.send('hello');
    return app;
    });
  }
  
}

module.exports = RouterApi;
