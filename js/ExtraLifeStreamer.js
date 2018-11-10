include("js/DataRequester.js");
include("js/PagePopulater.js");

let id;
let profile;
let requester;
let populater;

function main() {
  initializeSystem();
  startMonitoring();
}

function initializeSystem() {
  id = getId();
  profile = new ParticipantProfile();
  requester = new DataRequester(profile);
  populater = new PagePopulater(profile);
}

function getId () {
  let urlId = window.location.search.slice(4);
  if (urlId.length != 6) {
    throw "Invalid ID";
  }
  return urlId;
}

function startMonitoring() {
  (function refresh() {
    refreshAllData();
    setTimeout(refresh, 15000);
  })();
  (function populate() {
    populater.populatePageElements();
    setTimeout(populate, 0);
  })();
}

function formatId(element) {
  let e = element.value.replace(/\D/, "");
  if (e.length == 0) {
    element.value = "";
  } else {
    element.value = e.substring(0,6);
  }
  validateId();
}

function validateId() {
  let id = document.getElementById("id");
  let buttons = document.getElementsByTagName("button");
  if (id.value.length == 6) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute("disabled");
    }
  } else {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = "disabled";
    }
  }
}

function include(file) {
  if (fileNotLoaded(file)) {
    let x = document.createElement("script");
    x.src = window.location.href.split("/ExtraLifeStreamer/")[0] + "/ExtraLifeStreamer/" + file;
    document.head.insertBefore(x, document.head.firstChild);
  }
}

function fileNotLoaded(file) {
  let scripts = document.head.getElementsByTagName("script");
  for (let s = 0; s < scripts.length; s++) {
    if (scripts[s].attributes.src.value.includes(file)) {
      return false;
    }
  }
  return true;
}

function refreshAllData() {
  for (let endpoint of Object.keys(profile.data)) {
    if (endpoint.includes("teams") && profile.data["participant"]) {
      requester.retrieveData("/teams/" + profile.data["participant"].teamID, function(response) {
        profile.data[endpoint] = JSON.parse(response);
      });
    }
    if (endpoint.includes("participant")) {
      requester.retrieveData("/participants/" + id, function (response) {
        profile.data[endpoint] = JSON.parse(response);
      });
    }
    if (endpoint.includes("participantDonations")) {
      requester.retrieveData("/participants/" + id + "/donations", function (response) {
        profile.data[endpoint] = JSON.parse(response);
      });
    }
  }
}
