/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",   // this variable is provided as a consistent location
			   // it is currently only used by 3rd party modules. no MagicMirror code uses this value
			   // as we have no usage, we  have no constraints on what this field holds
			   // see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "Helgdagar",
			position: "top_left",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						// url: "http://myske.se/mskeCalendar.ics"
						// url: "https://calendar.google.com/calendar/u/0?cid=bWF0dGlhc215c2tlQGdtYWlsLmNvbQ"
						url: "https://calendar.google.com/calendar/ical/sv.swedish%23holiday%40group.v.calendar.google.com/public/basic.ics"
					}
				]
			}
		},
		// {
		// 	module: "compliments",
		// 	position: "lower_third"
		// },		
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "SMHI",
				type: "current",
				lat: 59.47249677718379,  // HAGBY
				lon: 18.021319217941848
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Utsikter",
			config: {
				weatherProvider: "SMHI",
				type: "forecast",
				lat: 59.47249677718379,  // HAGBY
				lon: 18.021319217941848
			}
		},
		{
			module: "tibber",
			position: "top_right",
			config: {
				text: "17 öre"
			}
		},		
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_left",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "Sportbladet Hockey 1",
		// 				url: "https://rss.aftonbladet.se/rss2/small/pages/sections/sportbladet/hockey/"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true,
		// 		broadcastNewsFeeds: true,
		// 		broadcastNewsUpdates: true
		// 	}
		// },
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Sportnyheter",
						// url: "https://rss.aftonbladet.se/rss2/small/pages/sections/sportbladet/fotboll/"
						url: "https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/sport/"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
