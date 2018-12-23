function DataRequester() {
  let baseUrl = "https://www.extra-life.org/index.cfm?&format=json&fuseaction=donordrive.";
  
  this.setupResponse = function(request, callback) {
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        callback(request.responseText);
      }
    }
  }

  this.makeUrl = function(endpoint, id) {
    return baseUrl + endpoint + id;
  }
}

DataRequester.prototype.retrieveData = function(endpoint, id, callback) {
  let request = new XMLHttpRequest();
  this.setupResponse(request, callback);
  request.open('GET', this.makeUrl(endpoint, id));
  request.send();
}
