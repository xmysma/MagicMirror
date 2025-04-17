Module.register("tibber", {
	// Default module config.
	defaults: {
		text: "12 öre",
		apiKey: "DIN_API_NYCKEL",
		url: "https://api.tibber.com/v1-beta/gql"

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

(function () {
	// const apiKey = "DIN_API_NYCKEL"; // Ersätt med din API-nyckel
	// const url = "https://api.tibber.com/v1-beta/gql"; // Tibbers GraphQL-endpoint

	const query = `
		{
			viewer {
				homes {
				id
				address {
					city
					street
				}
				currentSubscription {
					priceInfo {
					current {
						total
					}
					}
				}
				}
			}
		}
	`;

	async function fetchTibberData () {
		console.log("¤¤¤ fetchTibberData");
		Log.log("fetchTibberData...");
		const response = await fetch(config.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${config.apiKey}`
			},
			body: JSON.stringify({ query })
		});

		if (!response.ok) {
			throw new Error(`Något gick fel: ${response.statusText}`);
		}

		const data = await response.json();
		Log.log("fetchTibberData data", data);
		console.log(data);
	}

	fetchTibberData().catch(console.error);
});
