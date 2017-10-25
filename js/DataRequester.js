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
  requestParticipant();
  // requestDonations();
  
  function requestParticipant() {
    var url = PARTICIPANT_URL + PARTICIPANT_ID;
    xhr(url, function(response) {
      participant = JSON.parse(response);
      var fill = document.getElementById("fill");
      var text = document.getElementById("text");
      if (fill && text) {
        fill.style.width = calculatePercentage();
        text.innerHTML = "&#36;" + response.totalRaisedAmount;
        text.innerHTML += " / ";
        text.innerHTML += "&#36;" + response.fundraisingGoal;
      }
    });
  }
  
  function requestDonations() {
    var url = DONATIONS_URL + PARTICIPANT_ID;
    xhr(url, function(response) {
      donations = JSON.parse(response);
      var donationList = document.getElementById("donationList");
      clearChildren(donationList);
      for (let d of donations) {
        var itemText = d.donorName ? d.donorName : "Anonymous";
        var textNode = document.createTextNode(itemText);
        var listItem = document.createElement("li");
        listItem.appendChild(textNode);
        donationList.appendChild(listItem);
      }
    });
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

function calculatePercentage() {
  var p = participant.totalRaisedAmount / participant.fundraisingGoal * 100;
  return percentString(p.toFixed(0));
}
function clearChildren(e) {
  while (e.hasChildNodes()) {
    e.removeChild(e.lastChild);
  }
}

function percentString(i) {
  return i.toString() + "%";
}
