/**
 * General Google Commands
 *
 * @author    	Luke Strickland
 * @website		http://axxim.net/
 * @copyright	Axxim, LLC 2011
 * @license     Public Domain
 */
 
var sys = require('util');
var http = require('http');
var https = require('https');

Plugin = exports.Plugin = function(irc) {
	this.name = 'google';
	this.title = 'General Google';
	this.version = '0.1';
	this.author = 'Luke Strickland';

	this.irc = irc;

    irc.addTrigger(this, 'google', this.search);
    irc.addTrigger(this, 'ungoogl', this.unshorten);
};

Plugin.prototype.search = function(msg) {
	var irc = this.irc, // irc object
	    c = msg.arguments[0], // channel
        chan = irc.channels[c], // channel object
		u = irc.user(msg.prefix), // user
		m = msg.arguments[1], // message
        params = m.split(' ');

	params.shift();
    if (typeof params[0] == 'undefined') {
        chan.send('\002Usage:\002 .google <query>');
    } else {
        
        var options = {  
           host: 'ajax.googleapis.com',   
           port: 80,   
           path: '/ajax/services/search/%s?v=1.0&safe=off&q='  
        };   
        var req = http.get(options, function(res) {  
          console.log("Got response: " + res.statusCode);   
          res.on('data', function(chunk) {  
               console.log("Body: " + chunk);   
          });   
        }).on('error', function(e) {  
          console.log("Got error: " + e.message);   
        });   
        
		chan.send('Het woord \002' + params[ 0] + '\002 is vanaf nu niet meer toegestaan!');
    }
};

Plugin.prototype.unshorten = function(msg) {
    var irc = this.irc, // irc object
	    c = msg.arguments[0], // channel
        chan = irc.channels[c], // channel object
		u = irc.user(msg.prefix), // user
		m = msg.arguments[1], // message
        params = m.split(' ');

	params.shift();
    if (typeof params[0] == 'undefined') {
        chan.send('\002Usage:\002 .ungoogl <longurl>');
    } else {
        var options = {  
            host: 'www.googleapis.com',   
            port: 443,   
            method: 'GET',
            path: '/urlshortener/v1/url?shortUrl=' + params[0]   
        };   
        var req = https.get(options, function(res) {  
            res.on('data', function(chunk) {
                chan.send(params[0]+ ' is ' + JSON.parse(chunk)["longUrl"]);
            });   
        }).on('error', function(e) {  
            console.log("Got error: " + e.message);   
        });   
        
    }
};