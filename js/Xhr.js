var Xhr = (function(){
	return {
		get: (endpoint, callback) => {
			let request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (request.readyState == request.DONE) {
					callback(request.responseText);
				}
			};
			request.open('GET', endpoint);
			request.send();
		}
	};
})();
	