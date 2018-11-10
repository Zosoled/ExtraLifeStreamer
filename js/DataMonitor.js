function DataMonitor(e) {
	let endpoint = e;
	let timeoutId = null;
	let jsonData = null;
	let callback = null;

	this.start = function (c) {
		if (timeoutId) throw "Process already started. Call stop() first.";
		callback = c;
		(function refresh() {
			new Xhr().get(endpoint, function (response) {
				jsonData = JSON.parse(response);
			});
			timeoutId = setTimeout(refresh, 15000);
			callback(jsonData);
		})();
	}

	this.stop = function () {
		if (!timeoutId) throw "Process not yet started. Call start(callback) first.";
		clearTimeout(timeoutId);
	}
}
