/**
 * IRC Bot
 *
 * @author		Michael Owens
 * @website		http://www.michaelowens.nl
 * @copyright	Michael Owens 2011
 */
var sys = require('util'),
	irc = require('./irc');

/**
 * Config
 */
var config = {
	host:		'bots.esper.net',
	port:		6667,
	nick:		'SexBot',
	username:	'SexBot',
	realname:	'SexBot',
	channels:	['#risucraft'],
	command:	'.',
	debug:		false,

	plugins:	['global', 'reload']
};

/**
 * Let's power up
 */
var ircClient = new irc.Server(config);
ircClient.connect();