include("js/ParticipantProfile.js");

function DataRequester(p) {
  this.baseUrl = "https://www.extra-life.org/index.cfm?&format=json&fuseaction=donordrive.";
  this.profile = p;
  this.id = this.getId();
}

DataRequester.prototype.getId = function() {
  let urlId = window.location.search.slice(4);
  if (urlId.length != 6) {
    throw "Invalid ID";
  }
  return urlId;
}

DataRequester.prototype.refreshAllData = function() {
  for (let endpoint of Object.keys(profile.data)) {
    this.retrieveData(this.makeUrl(endpoint), function(response) {
      profile.data[endpoint] = JSON.parse(response);
    });
  }
}

DataRequester.prototype.makeUrl = function(endpoint) {
  return this.baseUrl + endpoint + "&participantID=" + this.id;
}

DataRequester.prototype.retrieveData = function(url, callback) {
  let x = new XMLHttpRequest();
  x.onreadystatechange = function() {
    if (x.readyState == 4 && x.status == 200) {
      callback(x.responseText);
    }
  }
  x.open('GET', url);
  x.send();
}
