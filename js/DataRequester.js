function Xhr() { }

Xhr.prototype.get = function(endpoint, callback) {
	let request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
		}
	};
	request.open('GET', endpoint);
	request.send();
};
