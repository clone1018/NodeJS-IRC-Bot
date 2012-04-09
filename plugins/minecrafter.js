/**
 * General Google Commands
 *
 * @author        Luke Strickland
 * @website		http://axxim.net/
 * @copyright	Axxim, LLC 2011
 * @license     Public Domain
 */
 
var sys = require('util');
var https = require('https');

Plugin = exports.Plugin = function(irc) {
	this.name = 'minecrafter';
	this.title = 'Minecrafter Plugin';
	this.version = '0.1';
	this.author = 'Luke Strickland';

	this.irc = irc;

    irc.addTrigger(this, 'servers', this.servers);
};

Plugin.prototype.servers = function(msg) {
	var irc = this.irc, // irc object
	    c = msg.arguments[0], // channel
        chan = irc.channels[c], // channel object
		u = irc.user(msg.prefix), // user
		m = msg.arguments[1], // message
        params = m.split(' '),
        servers = null;

	params.shift();
    if (typeof params[0] == 'undefined') {
        chan.send('\002Usage:\002 .servers <query>');
    } else {
        
        var options = {  
           host: 'minecrafter.com',   
           port: 443,   
           path: '/api/servers'  
        };   

        https.get(options, function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            
            res.on('data', function(d) {
                process.stdout.write(d);
                servers = d;
            });
            
            var count = 0;
            for ( property in this.servers ) count++;
            
            chan.send(count);
            
        }).on('error', function(e) {
            console.error(e);
        });
        
    }
};