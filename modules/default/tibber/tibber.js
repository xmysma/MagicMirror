// let tibberPrice;

Module.register("tibber", {
	// Default module config.
	defaults: {
		price: ""
	},

	getTemplate () {
		return "tibber.njk";
	},

	getTemplateData () {
		this.fetchTibberData().then((result) => {
			this.config.price = `${result.now} öre => ${result.next} öre`;
			console.log("¤¤¤ Tibber", `${result.now} öre => ${result.next} öre`);
			return this.config;
		});
	},
	async fetchTibberData () {
		const query = `
			{
				viewer {
					homes {
					id
						address {
							city
						}
						currentSubscription {
							priceInfo {
								current {
									total
								},
								today {
									total
								},
								tomorrow {
									total
								}
							}
						}
					}
				}
			}
		`;

		const response = await fetch(this.config.url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.config.apiKey}`
			},
			body: JSON.stringify({ query })
		});

		if (!response.ok) {
			Log.log("error response:", response);
			throw new Error(`Något gick fel: ${response.statusText}`);
		}

		const data = await response.json();
		console.log("¤¤¤ Tibber data", data);
		return new Promise((resolve) => {
			setTimeout(() => {
				const prices = this.getPrices(data);
				resolve(prices);
			}, 500);
		});
	},
	getPrices (data) {
		const priceInfo = data?.data.viewer.homes[0].currentSubscription.priceInfo;
		const nowPrice = Math.round(priceInfo.current.total * 100);

		let nextHour = new Date().getHours() + 1;
		let nextPrice = 0;
		if (nextHour === 0) {
			// next hour is new day
			nextPrice = Math.round(priceInfo.tomorrow[nextHour].total * 100);
		} else {
			// next hour is same day
			nextPrice = Math.round(priceInfo.today[nextHour].total * 100);
		}
		return { now: nowPrice, next: nextPrice };
	}
});
