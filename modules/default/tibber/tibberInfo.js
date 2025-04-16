Module.register("tibber", {
	// Default module config.
	defaults: {
		text: "12 öre"
	},

	getTemplate () {
		return "tibber.njk";
	},

	getTemplateData () {
		return this.config;
	},

	getCurrentPrice () {
		return 12.4;
	}
});
