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
  
  requestParticipantData();
  requestDonationData();
  
  function requestParticipantData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        var width = (response.totalRaisedAmount / response.fundraisingGoal * 100).toFixed(0);
        var hp = document.getElementById("hp");
        var meterGradient = "linear-gradient(90deg, " +
            LIGHT_GREEN_HEX + " " + makePercentString(width) + ", " +
            DARK_BLUE_HEX + " " + makePercentString(width) + ", " +
            DARK_BLUE_HEX + " 100%)";
        var meterBorder = ".1em solid " + LIGHT_BLUE_HEX;
        hp.style.backgroundImage = meterGradient;
        hp.style.border = meterBorder;
        hp.innerHTML = "&#36;" + response.totalRaisedAmount;
        hp.innerHTML += " / ";
        hp.innerHTML += "&#36;" + response.fundraisingGoal;
      }
    };
    request.open("GET", PARTICIPANT_URL + PARTICIPANT_ID);
    request.send();
  }
  
  function requestDonationData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        for (var i = 0; i < response.length; i++) {
            donations.add(response[i]);
        }
        
        clearChildren("donationList");
        var donationList = document.getElementById("donationList");
        for (var d of donations) {
          var itemText = d.donorName ? d.donorName : "Anonymous";
          var textNode = document.createTextNode(itemText);
          var listItem = document.createElement("li");
          listItem.appendChild(textNode);
          donationList.appendChild(listItem);
        }
      }
    };
    request.open("GET", DONATIONS_URL + PARTICIPANT_ID);
    request.send();
  }
  
  function clearChildren(id) {
    var node = document.getElementById(id);
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
  
  function makePercentString(i) {
    return i.toString() + "%";
  }
}
