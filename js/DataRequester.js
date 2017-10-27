const BASE_URL = "https://www.extra-life.org/index.cfm?&format=json";
const PARTICIPANT_URL = BASE_URL + "&fuseaction=donordrive.participant&participantID=";
const DONATIONS_URL = BASE_URL + "&fuseaction=donordrive.participantDonations&participantID=";
const TEAM_URL = BASE_URL + "&fuseaction=donordrive.team&teamID=";
const TEAM_PARTICIPANTS_URL = BASE_URL + "&fuseaction=donordrive.teamParticipants&teamID=";

const DARK_BLUE_HEX = "#1d4c6c";
const LIGHT_BLUE_HEX = "#23c1e8";
const LIGHT_GREEN_HEX = "#96d400";

var id;
var participant;
var donations;
var team;
var teamParticipants;

function main() {
  getId();
  refreshAllData();
  setInterval(refreshAllData, 60000);
}

function refreshAllData() {
  refreshParticipant();
  refreshDonations();
  if (participant) {
    refreshTeam();
    refreshTeamParticipants();
  }
}

function getId() {
  id = window.location.search.slice(4);
  if (id.length != 6) {
    throw "Invalid ID";
  }
}

function refreshParticipant() {
  let url = PARTICIPANT_URL + id;
  retrieveData(url, function(response) {
    if (!participant) {
      participant = JSON.parse(response);
      refreshAllData();
    } else {
      participant = JSON.parse(response);
    }
    handleParticipant();
  });
}

function refreshDonations() {
  let url = DONATIONS_URL + id;
  retrieveData(url, function(response) {
    donations = JSON.parse(response);
    handleDonations();
  });
}

function refreshTeam() {
  let url = TEAM_URL + participant.teamID;
  retrieveData(url, function(response) {
    team = JSON.parse(response);
    // add call to team handling here
  });
}

function refreshTeamParticipants() {
  let url = TEAM_PARTICIPANTS_URL + participant.teamID;
  retrieveData(url, function(response) {
    team = JSON.parse(response);
    // add call to team participants handling here
  });
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

function handleParticipant() {
  let fill = document.getElementById("fill");
  let text = document.getElementById("text");
  if (fill && text) {
    fill.style.width = calculatePercentage();
    text.innerHTML = "$" + participant.totalRaisedAmount;
    text.innerHTML += " / ";
    text.innerHTML += "$" + participant.fundraisingGoal;
  }
}

function handleDonations() {
  let donationListElement = document.getElementById("donations");
  if (donationListElement) {
    clearChildren(donationListElement);
    for (let d of donations) {
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

function calculatePercentage() {
  let p = participant.totalRaisedAmount / participant.fundraisingGoal * 100;
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
