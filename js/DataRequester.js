function DataRequester() {
  let baseUrl = "https://www.extra-life.org/api";
  
  this.makeUrl = function(endpoint) {
    return baseUrl + endpoint;
  }
}

DataRequester.prototype.retrieveData = function(endpoint, callback) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      callback(request.responseText);
    }
  }
  request.open('GET', this.makeUrl(endpoint));
  request.send();
}
