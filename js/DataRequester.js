const BASE_URL = "https://www.extra-life.org/index.cfm?&format=json&fuseaction=donordrive.";
const DARK_BLUE_HEX = "#1d4c6c";
const LIGHT_BLUE_HEX = "#23c1e8";
const LIGHT_GREEN_HEX = "#96d400";

var id;
var Profile = {
  "participant": null,
  "participantDonations": null,
  "team": null,
  "teamParticipants": null
};

function main() {
  getId();
  refreshAllData();
  setInterval(refreshAllData, 60000);
}

function getId() {
  id = window.location.search.slice(4);
  if (id.length != 6) {
    throw "Invalid ID";
  }
}

function refreshAllData() {
  for (let endpoint of Object.keys(Profile)) {
    retrieveData(makeUrl(endpoint), function(response) {
      Profile[endpoint] = JSON.parse(response);
      populatePageElements();
    });
  }
}

function makeUrl(endpoint) {
  return BASE_URL + endpoint + "&participantID=" + id;
}

function retrieveData(file, callback) {
  let x = new XMLHttpRequest();
  x.onreadystatechange = function() {
    if (x.readyState == 4 && x.status == 200) {
      callback(x.responseText);
    }
  }
  x.open('GET', file);
  x.send();
}

function populatePageElements() {
  handleParticipant();
  handleDonations();
}

function handleParticipant() {
  if (Profile.participant) {
  let fill = document.getElementById("fill");
  let text = document.getElementById("text");
  if (fill && text) {
    fill.style.width = calculatePercentage();
    text.innerHTML = "$" + Profile.participant.totalRaisedAmount;
    text.innerHTML += " / ";
    text.innerHTML += "$" + Profile.participant.fundraisingGoal;
  }
}
}

function handleDonations() {
  if (Profile.donations) {
  let donationListElement = document.getElementById("donations");
  if (donationListElement) {
    clearChildren(donationListElement);
    for (let d of Profile.donations) {
      let itemText = d.donationAmount ? "$" + d.donationAmount : "Amount hidden";
      itemText += " - ";
      itemText += d.donorName ? d.donorName : "Anonymous";
      let textNode = document.createTextNode(itemText);
      let listItem = document.createElement("li");
      listItem.appendChild(textNode);
      donationListElement.appendChild(listItem);
    }
  }
}
}

function calculatePercentage() {
  let p = Profile.participant.totalRaisedAmount / Profile.participant.fundraisingGoal * 100;
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
