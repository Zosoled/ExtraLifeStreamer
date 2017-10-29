include("js/DataRequester.js");

function main() {
  getId();
  refreshAllData();
  setInterval(refreshAllData, 60000);
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
