var app = require('./');
const db = require('../db')

var debug = require('debug')('app')


app.set('port', process.env.PORT || 3000);

//sync database then start up server
db.sync()
    .then(function () {
        var server = app.listen(app.get('port'), function () {
            debug('Express server listening on port ' + server.address().port)
        })
    })
