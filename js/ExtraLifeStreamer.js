include("js/DataRequester.js");
include("js/PagePopulater.js");

const DARK_BLUE_HEX = "#1d4c6c";
const LIGHT_BLUE_HEX = "#23c1e8";
const LIGHT_GREEN_HEX = "#96d400";

let id;
let profile;
let requester;
let populater;

function main() {
  initializeSystem();
  startMonitoring();
}

function initializeSystem() {
  profile = new ParticipantProfile();
  requester = new DataRequester(profile);
  populater = new PagePopulater(profile);
}

function startMonitoring() {
  requester.refreshAllData();
  populater.populatePageElements();
  let intervalId1 = setInterval(function(){requester.refreshAllData()}, 60000);
  let intervalId2 = setInterval(function(){populater.populatePageElements()}, 0);
}

function formatId(element) {
  let id = element.value.replace(/\D/, "");
  if (id.length == 0) {
    element.value = "";
  } else {
    element.value = id.substring(0,6);
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
