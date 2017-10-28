include("js/ParticipantProfile.js");

const BASE_URL = "https://www.extra-life.org/index.cfm?&format=json&fuseaction=donordrive.";
const DARK_BLUE_HEX = "#1d4c6c";
const LIGHT_BLUE_HEX = "#23c1e8";
const LIGHT_GREEN_HEX = "#96d400";

let id;
let profile;

function getId() {
  profile = new ParticipantProfile();
  id = window.location.search.slice(4);
  if (id.length != 6) {
    throw "Invalid ID";
  }
}

function refreshAllData() {
  for (let endpoint of Object.keys(profile.data)) {
    retrieveData(makeUrl(endpoint), function(response) {
      profile.data[endpoint] = JSON.parse(response);
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
  if (profile.data.participant) {
    let fill = document.getElementById("fill");
    let text = document.getElementById("text");
    if (fill && text) {
      fill.style.width = profile.participantPercentRaised();
      text.innerHTML = "$" + profile.data.participant.totalRaisedAmount;
      text.innerHTML += " / ";
      text.innerHTML += "$" + profile.data.participant.fundraisingGoal;
    }
  }
}

function handleDonations() {
  if (profile.data.participantDonations) {
    let donationListElement = document.getElementById("donations");
    if (donationListElement) {
      clearChildren(donationListElement);
      for (let d of profile.data.participantDonations) {
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

function clearChildren(e) {
  while (e.hasChildNodes()) {
    e.removeChild(e.lastChild);
  }
}
