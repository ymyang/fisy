/**
 * Created by yang on 2015/7/8.
 */
var fis = module.exports = require('fis');

fis.cli.name = 'fisy';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

require('./fis-conf.js');
