/**
 * Last Seen Plugin
 *
 * @author		Michael Owens
 * @website		http://www.michaelowens.nl
 * @copyright	Michael Owens 2011
 */
var sys = require('util');

Plugin = exports.Plugin = function(irc) {

	this.name = 'seen';
	this.title = 'Last Seen';
	this.version = '0.2';
	this.author = 'Michael Owens';

	this.irc = irc;

	this.seen = [];

	this.irc.addTrigger(this, 'seen', this.trigSeen);

};

Plugin.prototype.onMessage = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onJoin = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onPart = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onQuit = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onNick = function(msg) {
	this.updateUser(msg, true);
};

Plugin.prototype.updateUser = function(msg, argument) {

	var u = this.irc.user(msg.prefix);
    console.log(u, msg.prefix);
	this.seen[u.toLowerCase()] = new Date();

	if (typeof argument != 'undefined') {
		var u = msg.arguments[0];

		this.seen[u.toLowerCase()] = new Date();
	}
}

Plugin.prototype.trigSeen = function(msg) {
	var c = msg.arguments[0], // channel
		u = this.irc.user(msg.prefix), // user
		m = msg.arguments[1], // message
        chan = this.irc.channels[c], // channel object
        params = m.split(' ');

	params.shift();

	if (typeof params[0] == 'undefined') {
		chan.send('\002Usage:\002 .seen <name>');
	} else {
		var seek = params[0].toLowerCase();

		if (typeof this.seen[seek] == 'undefined') {
			chan.send('I\'ve never seen \002' + params[ 0] + '\002');
		} else {
			var dat = this.seen[seek],
			    lastDate = dat.getMonth() + '-' + dat.getDay() + '-' + dat.getFullYear(),
			    lastTime = dat.getHours() + ':' + dat.getMinutes() + ':' + dat.getSeconds();

			chan.send('\002' + params[ 0] + '\002 was last seen on: \002' + lastDate + '\002 at \002' + lastTime + '\002');
		}
	}
};