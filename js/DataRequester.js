const PARTICIPANT_ID = "249219";
const PARTICIPANT_URL = "https://www.extra-life.org/index.cfm?fuseaction=donordrive.participant&format=json&participantID=";
const DONATIONS_URL = "https://www.extra-life.org/index.cfm?fuseaction=donordrive.participantDonations&format=json&participantID=";

const DARK_BLUE_HEX = "#1d4c6c";
const LIGHT_BLUE_HEX = "#23c1e8";
const LIGHT_GREEN_HEX = "#96d400";

var participant;
var donations;

function main() {
  refreshData();
  setInterval(refreshData, 60000);
}

function refreshData() {
  donations = new Set();
  
  requestParticipant();
  // requestDonations();
  
  function requestParticipant() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        var width = (response.totalRaisedAmount / response.fundraisingGoal * 100).toFixed(0);
        var fill = document.getElementById("fill");
        var text = document.getElementById("text");
        fill.style.width = percentString(width);
        text.innerHTML = "&#36;" + response.totalRaisedAmount;
        text.innerHTML += " / ";
        text.innerHTML += "&#36;" + response.fundraisingGoal;
      }
    };
    request.open("GET", PARTICIPANT_URL + PARTICIPANT_ID);
    request.send();
  }
  
  function requestDonations() {
    var url = DONATIONS_URL + PARTICIPANT_ID;
    xhr(url, function(response) {
      var donationList = JSON.parse(response);
      for (var i = 0; i < donationList.length; i++) {
        donations.add(donationList[i]);
      }
    });
    
    var donationList = document.getElementById("donationList");
    clearChildren(donationList);
    for (var d of donations) {
      var itemText = d.donorName ? d.donorName : "Anonymous";
      var textNode = document.createTextNode(itemText);
      var listItem = document.createElement("li");
      listItem.appendChild(textNode);
      donationList.appendChild(listItem);
    }
  }
}

function xhr(file, callback) {
  var x = new XMLHttpRequest();
  x.onreadystatechange = function() {
    if (x.readyState == 4 && x.status == 200) {
      callback(x.responseText);
    }
  }
  x.open('GET', file);
  x.send();
}

function clearChildren(e) {
  while (e.hasChildNodes()) {
    e.removeChild(e.lastChild);
  }
}

function percentString(i) {
  return i.toString() + "%";
}
